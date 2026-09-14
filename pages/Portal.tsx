
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { UserLevel } from '../types';
import LibraryDrawer from '../components/LibraryDrawer';
import ChatAssistant from '../components/ChatAssistant';
import FaqModal from '../components/FaqModal';
import { dashboardImage, simulatorImage } from '../assets/images';

const Portal = () => {
  const { user, updateUser } = useUser();
  
  const [cvLink, setCvLink] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  
  // Estados para el formulario de Oportunidades (Colaborador)
  const [optName, setOptName] = useState('');
  const [optCompany, setOptCompany] = useState('');
  const [optEmail, setOptEmail] = useState('');
  const [optPhone, setOptPhone] = useState('');
  const [optRegistered, setOptRegistered] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // Estado para el mensaje de la plataforma
  const [platformMessage, setPlatformMessage] = useState<{title: string, body: string, type: 'success' | 'error'} | null>(null);

  if (!user) return null;

  const isDemo = user.id === 'demo' || user.email === 'admin@ejemploempresa.ai';
  const isEjemplosDeVenta = user.nivel_elegido === UserLevel.EJEMPLOS_DE_VENTA;
  const isColaborador = user.nivel_elegido === UserLevel.COLABORADOR;
  const isDelegado = user.nivel_elegido === UserLevel.MOCOTA_SIN_REDACCION || user.nivel_elegido === UserLevel.MOCOTA_CON_REDACCION;
  
  const needsApplication = (isColaborador || isDelegado) && (user.application_status === 'not_started' || !user.application_status);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await updateUser({
      cv_link: cvLink,
      linkedin_url: linkedin,
      cover_letter: coverLetter,
      application_status: 'pending'
    });
    setSubmitting(false);
  };

  const simulateFullProgress = () => {
    const updates: any = {
      m1_completed: true,
      m2_completed: true,
      m3_completed: true,
      m4_completed: true,
      application_status: 'approved', 
      validation_status: 'passed_sales', 
      contract_signed: false 
    };
    if (isEjemplosDeVenta) {
      // No modules to complete
    } else updates.test_passed = true;
    
    updateUser(updates);
    setPlatformMessage(null);
  };

  const simulateValidationResult = (status: string) => {
    const updates: any = {
      validation_status: status as any,
      application_status: status.includes('passed') ? 'approved' : (status.includes('failed') ? 'rejected' : 'approved'),
      // Nota: En simulación reseteamos el progreso formativo para poder testear los estados de bloqueo/desbloqueo
      m1_completed: false, 
      m2_completed: false, 
      m3_completed: false, 
      m4_completed: false,
      test_passed: false,
      m5_completed: false,
      contract_signed: status === 'passed' ? true : false
    };

    updateUser(updates);

    switch(status) {
      case 'passed_hr':
        setPlatformMessage({
          title: "Has superado la fase de RRHH",
          body: "Has superado satisfactoriamente la entrevista con el equipo de Recursos Humanos y has sido seleccionado para continuar en el proceso de Colaborador. El siguiente paso será una segunda ronda de entrevistas con el equipo de Ventas, donde profundizaremos en el encaje comercial y el modelo de colaboración. En breve recibirás un correo con los detalles para continuar. Gracias por seguir avanzando con nosotros.",
          type: 'success'
        });
        break;
      case 'failed_hr':
        setPlatformMessage({
          title: "Resultado del proceso: RRHH",
          body: "Gracias por participar en el proceso de selección para el rol de Colaborador. Tras la entrevista con el equipo de Recursos Humanos, en esta ocasión no continuaremos con tu candidatura. Agradecemos sinceramente el tiempo y el interés mostrado. Podrás volver a postularte en el futuro si así lo deseas.",
          type: 'error'
        });
        break;
      case 'passed_sales':
        setPlatformMessage({
          title: "¡Enhorabuena! Has sido aprobado",
          body: "Has superado con éxito la entrevista con el equipo de Ventas y has sido aprobado definitivamente como Colaborador. A partir de ahora, se te desbloquearán los módulos formativos, necesarios para comenzar a operar dentro del ecosistema. Gracias por tu compromiso durante todo el proceso y bienvenido/a.",
          type: 'success'
        });
        break;
      case 'failed_sales':
        setPlatformMessage({
          title: "Resultado del proceso: Ventas",
          body: "Gracias por haber participado en el proceso de selección para el rol de Colaborador. Tras la entrevista con el equipo de Ventas y la evaluación final, en esta ocasión no continuaremos con tu candidatura. Agradecemos sinceramente el tiempo, la dedicación y el interés mostrado. Te deseamos mucho éxito en tus próximos proyectos profesionales.",
          type: 'error'
        });
        break;
      case 'passed':
        setPlatformMessage({
          title: "¡Bienvenido al Ecosistema!",
          body: "Tu perfil ha sido validado correctamente. Ya puedes acceder a tu panel de control completo para gestionar tu actividad.",
          type: 'success'
        });
        break;
      default:
        setPlatformMessage(null);
    }
  };

  // Lógica de visualización
  const isApprovedBySales = user.validation_status === 'passed_sales';
  const isReadyToSign = isEjemplosDeVenta || user.validation_status === 'passed' || user.contract_signed; 
  const isTrainingCompleted = isEjemplosDeVenta || user.test_passed;

  // Los módulos se ocultan si el usuario ya ha firmado o está en estado de éxito final.
  const showModulesBlock = (isDelegado || (isColaborador && isApprovedBySales)) && !isReadyToSign;
  
  // Dashboard de Colaborador (Oportunidades + Comisiones + Métricas)
  const showColaboradorDashboard = isReadyToSign && isColaborador;

  const handleRegisterOpt = (e: React.FormEvent) => {
    e.preventDefault();
    setOptRegistered(true);
    setTimeout(() => {
        setOptRegistered(false);
        setOptName(''); setOptCompany(''); setOptEmail(''); setOptPhone('');
    }, 3000);
  };

  const m1_is_locked = false; 
  const m2_is_locked = !user.m1_completed;
  const m3_is_locked = m2_is_locked || !user.m2_completed;
  const m4_is_locked = m3_is_locked || !user.m3_completed; 
  const m5_is_locked = m4_is_locked || !user.m4_completed; 

  let modulesData = [];
  modulesData = [
      { id: 1, title: 'Módulo 1. Introducción al rol', path: '/modulo1', completed: user.m1_completed, locked: m1_is_locked },
      { id: 2, title: 'Módulo 2. Perfil ideal y encaje profesional', path: '/modulo2', completed: user.m2_completed, locked: m2_is_locked },
      { id: 3, title: 'Módulo 3. Propuesta de valor para el cliente', path: '/modulo3', completed: user.m3_completed, locked: m3_is_locked },
      { id: 4, title: 'Módulo 4. Modelo económico', path: '/modulo4', completed: user.m4_completed, locked: m4_is_locked },
      { id: 6, title: 'Test Final Competencias', path: '/test-final', completed: user.test_passed, locked: m5_is_locked },
  ];

  // Contexto detallado para el Chatbot del Ejemplos de venta
  const chatbotContext = `El usuario es un Ejemplos de venta. 
  Nuestra plataforma es un SaaS B2B con IA para gestión de subvenciones. 
  Roles: 
  - Ejemplos de venta: Refiere contactos. 7.5% comisión. Sin coste.
  - Colaborador: Vende y gestiona. 15% comisión. 3.000€ canon.
  - Delegado: Franquicia territorial. 30% comisión. 12.000€ canon.
  Proceso de éxito: Referir lead -> Pre-filtro técnico -> Cierre -> Pago comisión.`;

  return (
    <div className="mosaic-container pt-28 md:pt-32 pb-16 max-w-5xl">
      
      {/* Header */}
      <div className="mb-10 p-10 md:p-14 bg-mosaic-white-100 border border-mosaic-white-300 flex flex-col md:flex-row gap-10">
          <div className="flex-1">
              <p className="mosaic-label text-mosaic-cyan mb-4">Tu espacio</p>
              <h2 className="mosaic-h2 mb-10">
                  {isEjemplosDeVenta ? (
                    <span className="text-mosaic-cyan uppercase tracking-tighter">Ejemplos de venta</span>
                  ) : (
                    <>
                      {isColaborador ? 'BIENVENIDO/A A ' : isDelegado ? 'Delegado ' : 'Bienvenido '}
                      <span className="text-mosaic-cyan uppercase">{isColaborador ? 'Plataforma' : isDelegado ? 'MOCOTA' : 'Ecosistema'}</span> 🚀
                    </>
                  )}
              </h2>
              <div className="bg-mosaic-white-200 p-8 md:p-10 border border-mosaic-white-300">
                  <p className="mosaic-body text-sm">
                      {isEjemplosDeVenta 
                        ? 'Como Ejemplos de venta, juegas un papel clave conectando empresas con oportunidades reales de financiación pública. Desde aquí podrás recomendar nuestra herramienta para identificar, evaluar y acceder a ayudas alineadas con cada proyecto. Gracias por formar parte del ecosistema que transforma ideas en proyectos financiables.'
                        : isColaborador 
                          ? 'Como colaborador, formas parte activa del ecosistema que impulsa proyectos a través de la financiación pública. Tu conocimiento y experiencia contribuyen a evaluar, complementar y fortalecer propuestas, ayudando a las empresas a maximizar sus oportunidades de éxito. Gracias por sumar valor y talento a la comunidad.' 
                          : 'Bienvenido a tu centro de control profesional.'}
                  </p>

                  {isEjemplosDeVenta && (
                    <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
                        {/* Excel2Sales and Sales Example removed */}
                    </div>
                  )}
              </div>
          </div>

          {isDemo && (
              <div className="w-full md:w-80 bg-mosaic-white-200 p-6 border border-dashed border-mosaic-cyan/30 flex flex-col gap-2.5 shrink-0">
                  <img src={simulatorImage} alt="Simulador Admin" className="w-full h-auto mb-4" />
                  <p className="text-[9px] font-black text-gray-400 dark:text-gray-300 uppercase tracking-widest text-center mb-2">Acciones de Simulación</p>
                  
                  {/* BOTONES RRHH Y VENTAS: SOLO PARA COLABORADOR */}
                  {isColaborador && (
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => simulateValidationResult('passed_hr')} className="w-full py-2 bg-blue-500/10 text-blue-600 border border-blue-200 rounded-xl text-[9px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">1. Éxito RRHH</button>
                        <button onClick={() => simulateValidationResult('failed_hr')} className="w-full py-2 bg-red-500/10 text-red-600 border border-red-200 rounded-xl text-[9px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">2. Fracaso RRHH</button>
                        <button onClick={() => simulateValidationResult('passed_sales')} className="w-full py-2 bg-blue-500/10 text-blue-600 border border-blue-200 rounded-xl text-[9px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">3. Éxito Ventas</button>
                        <button onClick={() => simulateValidationResult('failed_sales')} className="w-full py-2 bg-orange-500/10 text-orange-600 border border-orange-200 rounded-xl text-[9px] font-black uppercase hover:bg-orange-500 hover:text-white transition-all">4. Fracaso Ventas</button>
                    </div>
                  )}

                  {isColaborador && <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>}

                  {!isEjemplosDeVenta && (
                    <button onClick={simulateFullProgress} className="w-full py-2.5 bg-mosaic-green/10 text-mosaic-green border border-brand-secondary/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-mosaic-green hover:text-white transition-all">
                        COMPLETAR FORMACIÓN
                    </button>
                  )}
              </div>
          )}
      </div>

      {platformMessage && (
        <div className="mb-12 animate-fade-in-up">
           <div className={`p-8 md:p-10 rounded-[3rem] border-2 shadow-2xl relative overflow-hidden ${platformMessage.type === 'success' ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-500/20' : 'bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-500/20'}`}>
              <div className="flex items-center gap-6 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${platformMessage.type === 'success' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                   {platformMessage.type === 'success' ? '🔵' : '🔴'}
                </div>
                <div>
                   <h3 className={`text-2xl font-black uppercase tracking-tighter leading-tight ${platformMessage.type === 'success' ? 'text-blue-800 dark:text-blue-400' : 'text-red-800 dark:text-red-400'}`}>
                     {platformMessage.title}
                   </h3>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium leading-relaxed px-2">{platformMessage.body}</p>
              <button onClick={() => setPlatformMessage(null)} className="absolute top-8 right-10 text-gray-400 hover:text-gray-600 font-bold transition-colors">✕</button>
           </div>
        </div>
      )}

      {/* DASHBOARD EJEMPLOS DE VENTA (ELIMINADO SEGÚN SOLICITUD) */}

      {/* DASHBOARD COLABORADOR */}
      {showColaboradorDashboard && (
          <div className="mt-12 space-y-12 animate-fade-in">
              {/* MÉTRICAS DE RENDIMIENTO (DASHBOARD) */}
              <div className="bg-mosaic-white-100 border border-mosaic-white-300 p-10 md:p-12 rounded-[4rem] shadow-2xl border-2 border-mosaic-cyan/5">
                  <div className="mb-12 text-left">
                      <h3 className="text-4xl font-black text-[#2a3b5a] dark:text-white uppercase tracking-tighter leading-none">MI DASHBOARD COMERCIAL</h3>
                      <p className="text-[11px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-[0.2em] mt-2 ml-1">RENDIMIENTO DE MI CARTERA DE CLIENTES</p>
                  </div>

                  <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 bg-white">
                      <img src={dashboardImage} alt="Dashboard Comercial" className="w-full h-auto" />
                  </div>
              </div>

              {/* REGISTRAR NUEVA OPORTUNIDAD */}
              <div className="bg-mosaic-white-100 border border-mosaic-white-300 p-10 md:p-14 rounded-[3.5rem] shadow-xl border border-gray-100 dark:border-white/5 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#7B79F7] rounded-[1.5rem] flex items-center justify-center text-white text-3xl shadow-xl shadow-[#7B79F7]/30">＋</div>
                  <div className="text-center mb-12 mt-6">
                      <h3 className="text-3xl font-black text-[#2a3b5a] dark:text-white uppercase tracking-tighter">REGISTRAR NUEVA OPORTUNIDAD</h3>
                      <p className="text-[11px] font-black text-gray-400 dark:text-gray-300 uppercase tracking-[0.2em] mt-2">INTRODUCE LOS DATOS DEL CONTACTO POTENCIAL</p>
                  </div>
                  <form onSubmit={handleRegisterOpt} className="space-y-8 max-w-4xl mx-auto">
                      <div className="grid md:grid-cols-2 gap-8">
                          <input type="text" required placeholder="Nombre del Contacto" className="app-input" value={optName} onChange={(e) => setOptName(e.target.value)} />
                          <input type="text" required placeholder="Empresa" className="app-input" value={optCompany} onChange={(e) => setOptCompany(e.target.value)} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                          <input type="email" required placeholder="Email Corporativo" className="app-input" value={optEmail} onChange={(e) => setOptEmail(e.target.value)} />
                          <input type="text" required placeholder="Teléfono" className="app-input" value={optPhone} onChange={(e) => setOptPhone(e.target.value)} />
                      </div>
                      <button type="submit" disabled={optRegistered} className="w-full py-7 bg-mosaic-black-500 text-white font-black rounded-3xl uppercase tracking-[0.3em] shadow-2xl hover:brightness-110 active:scale-95 transition-all text-sm">
                          {optRegistered ? 'OPORTUNIDAD REGISTRADA ✓' : 'REGISTRAR OPORTUNIDAD'}
                      </button>
                  </form>
              </div>

              {/* HISTORIAL DE COMISIONES */}
              <div className="bg-mosaic-white-100 border border-mosaic-white-300 p-10 md:p-14 rounded-[3.5rem] shadow-xl border border-gray-100 dark:border-white/5 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#2a3b5a] rounded-[1.5rem] flex items-center justify-center text-white text-3xl shadow-xl">💰</div>
                  <div className="text-center mb-12 mt-6">
                      <h3 className="text-3xl font-black text-[#2a3b5a] dark:text-white uppercase tracking-tighter">HISTORIAL DE COMISIONES</h3>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">LIQUIDACIONES PROCESADAS Y PENDIENTES</p>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="border-b dark:border-gray-800">
                                  <th className="py-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">EMPRESA / LEAD</th>
                                  <th className="py-6 px-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">ESTADO</th>
                                  <th className="py-6 px-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">COMISIÓN</th>
                                  <th className="py-6 px-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest">IMPORTE EST.</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td colSpan={4} className="py-20 text-center">
                                      <p className="text-sm font-bold text-gray-400 italic tracking-tight">No se han encontrado liquidaciones hasta la fecha.</p>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}

      {/* Secciones de Candidatura (Solo flujo inicial) */}
      {(isColaborador || isDelegado) && needsApplication && (
        <div className="mb-12 animate-fade-in px-2">
           <div className="border-2 border-mosaic-cyan/40 rounded-[3rem] p-1 shadow-2xl bg-white/50 dark:bg-brand-darkCard/50">
             <div className="p-10 md:p-14 bg-mosaic-white-100 border border-mosaic-white-300 rounded-[2.8rem]">
                <h1 className="text-4xl font-bold text-mosaic-black-500 mb-2 tracking-tight">Tu Candidatura</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-12 font-medium">Completa los datos para iniciar el proceso de validación comercial.</p>
                <form onSubmit={handleApply} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <input type="url" required placeholder="Enlace a CV (Drive/Dropbox)" className="app-input" value={cvLink} onChange={(e) => setCvLink(e.target.value)} />
                    <input type="url" required placeholder="Perfil de LinkedIn" className="app-input" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                  </div>
                  <textarea required rows={4} placeholder="Carta de motivación / Experiencia relevante..." className="app-input resize-none" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
                  <button type="submit" disabled={submitting} className="w-full py-6 bg-mosaic-black-500 text-white font-black rounded-3xl uppercase tracking-widest shadow-xl disabled:opacity-50">
                    {submitting ? 'Enviando...' : 'Enviar Datos de Validación'}
                  </button>
                </form>
             </div>
           </div>
        </div>
      )}

      {/* ITINERARIO FORMATIVO (Aparece junto al dashboard si está desbloqueado pero aún no se ha completado la firma final) */}
      {showModulesBlock && (
        <div className="mt-12 space-y-8 animate-fade-in">
            <div className="bg-mosaic-white-100 border border-mosaic-white-300 p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/5">
                <h3 className="mosaic-h4 mb-8">Itinerario de especialización</h3>
                <div className="space-y-4">
                    {modulesData.map((m) => (
                        <div key={m.id} className={`flex items-center justify-between p-6 bg-mosaic-white-100 border border-mosaic-white-300 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all ${m.locked ? 'opacity-30 grayscale pointer-events-none' : 'hover:border-mosaic-cyan/30'}`}>
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${m.completed ? 'bg-mosaic-green' : 'bg-mosaic-black-500'}`}>
                                {m.completed ? '✓' : (m.id === 6 ? 'T' : m.id)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-mosaic-black-500 leading-none">{m.title}</h3>
                                <p className={`text-[10px] font-black uppercase mt-1.5 tracking-[0.2em] ${m.completed ? 'text-mosaic-green' : 'text-gray-400'}`}>{m.completed ? 'COMPLETADO' : m.locked ? 'BLOQUEADO' : 'PENDIENTE'}</p>
                            </div>
                        </div>
                        <Link to={m.path} className={`px-10 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${m.completed ? 'bg-mosaic-green/10 text-mosaic-green hover:bg-mosaic-green hover:text-white' : 'bg-mosaic-black-500 text-white hover:brightness-110 shadow-lg'}`}>
                            {m.completed ? 'Repasar' : 'Comenzar'}
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* SECCIÓN DE PASOS FINALES (Discovery, Demo, Simulacro) */}
      {isColaborador && isTrainingCompleted && !user.contract_signed && (
        <div className="mt-12 space-y-8 animate-fade-in">
           <div className="bg-mosaic-white-100 border border-mosaic-white-300 p-10 rounded-[3rem] shadow-2xl border-2 border-brand-secondary/30">
              <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter mb-8 text-center">Pasos Finales antes de la Firma</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                 {/* Discovery */}
                 <a href="https://www.youtube.com/@PublicFunding" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 bg-gray-50 dark:bg-brand-darkBg rounded-[2rem] border border-gray-100 dark:border-white/5 hover:scale-[1.02] transition-all group">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📺</div>
                    <h4 className="text-lg font-black dark:text-white uppercase tracking-tight mb-2">Ver Discovery</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">YouTube @PublicFunding</p>
                 </a>

                 {/* Demo */}
                 <a href="https://www.youtube.com/@PublicFunding" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 bg-gray-50 dark:bg-brand-darkBg rounded-[2rem] border border-gray-100 dark:border-white/5 hover:scale-[1.02] transition-all group">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">💻</div>
                    <h4 className="text-lg font-black dark:text-white uppercase tracking-tight mb-2">Ver Demo</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">YouTube @PublicFunding</p>
                 </a>

                 {/* Simulacro Ventas */}
                 <button onClick={() => setIsCalendarModalOpen(true)} className="flex flex-col items-center p-8 bg-gray-50 dark:bg-brand-darkBg rounded-[2rem] border border-gray-100 dark:border-white/5 hover:scale-[1.02] transition-all group">
                    <div className="w-16 h-16 bg-mosaic-black-500/10 text-mosaic-cyan rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📅</div>
                    <h4 className="text-lg font-black dark:text-white uppercase tracking-tight mb-2">Agendar Simulacro</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{appointmentBooked ? 'Cita Agendada ✓' : 'Cita con un experto'}</p>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Banner de Firma Digital (Si no le falta firmar) */}
      {!isEjemplosDeVenta && !user.contract_signed && (user.application_status === 'approved' || user.validation_status === 'passed') && (
        <div className="mt-12 bg-mosaic-white-100 border border-mosaic-white-300 p-10 rounded-[2.5rem] shadow-card border-2 border-mosaic-cyan animate-fade-in mb-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-mosaic-black-500/10 rounded-full flex items-center justify-center text-mosaic-cyan text-2xl">✒️</div>
                <h2 className="text-3xl font-black text-mosaic-black-500 uppercase tracking-tighter">Firma tu Convenio</h2>
            </div>
            <Link to="/contrato" className="block w-full max-w-md mx-auto py-6 bg-mosaic-black-500 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-sm hover:scale-[1.02] transition-all">
                Acceder a la Firma Digital
            </Link>
        </div>
      )}

      {/* Chatbot Global del Portal */}
      <ChatAssistant 
        context={chatbotContext} 
        isOpenExternal={isChatbotOpen} 
        onToggleExternal={setIsChatbotOpen} 
      />

      {/* Biblioteca Drawer */}
      <LibraryDrawer isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />

      {/* FAQ Modal */}
      <FaqModal isOpen={isFaqModalOpen} onClose={() => setIsFaqModalOpen(false)} />

      {/* MODAL CALENDARIO SIMULACRO */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-mosaic-black-500/80 backdrop-blur-sm p-4 md:p-6">
            <div className="bg-mosaic-white-100 border border-mosaic-white-300 w-full max-w-lg p-8 md:p-10">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="mosaic-h4">Agendar simulacro de ventas</h3>
                    <button type="button" onClick={() => setIsCalendarModalOpen(false)} className="text-mosaic-black-300 hover:text-mosaic-cyan">✕</button>
                </div>

                {!appointmentBooked ? (
                    <div className="space-y-6">
                        <div>
                            <label className="mosaic-label text-mosaic-black-300 block mb-2">Selecciona un día</label>
                            <input
                                type="date"
                                className="app-input"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div>
                            <label className="mosaic-label text-mosaic-black-300 block mb-2">Selecciona una hora</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['10:00', '11:00', '12:00', '16:00', '17:00', '18:00'].map(time => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 mosaic-label text-xs border transition-colors ${
                                          selectedTime === time
                                            ? 'bg-mosaic-black-500 border-mosaic-black-500 text-mosaic-white-100'
                                            : 'bg-mosaic-white-200 border-mosaic-white-300 hover:border-mosaic-cyan'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (selectedDate && selectedTime) {
                                    setAppointmentBooked(true);
                                    setTimeout(() => setIsCalendarModalOpen(false), 2000);
                                } else {
                                    alert("Por favor selecciona día y hora.");
                                }
                            }}
                            className="w-full py-4 bg-mosaic-black-500 text-mosaic-white-100 mosaic-label hover:bg-mosaic-cyan transition-colors mt-4"
                        >
                            Confirmar cita con experto
                        </button>
                    </div>
                ) : (
                    <div className="py-8 text-center space-y-4">
                        <div className="text-5xl">🎉</div>
                        <h4 className="mosaic-h4">¡Cita confirmada!</h4>
                        <p className="mosaic-body text-sm">Recibirás un correo con el enlace de Google Meet para el día {selectedDate} a las {selectedTime}.</p>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Portal;
