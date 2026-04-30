
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../context/SettingsContext';
import { 
  Target, 
  Zap, 
  Globe, 
  CheckCircle2,
  AlertCircle,
  User,
  Lightbulb,
  XCircle,
  Star
} from 'lucide-react';

const SolutionsPage = () => {
  const { theme } = useSettings();
  const navigate = useNavigate();
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      id: 0,
      role: "Director Comercial / CEO",
      segment: "Empresa B2B Consolidada",
      company: "Servicios Industriales / Consultoría",
      responsibility: "Decisor final, visión y ROI",
      context: {
        situation: "Crecimiento estancado con facturación estable.",
        maturity: "Media. CRM usado solo como base de datos.",
        network: "Extensa pero contactos 'dormidos'."
      },
      pains: [
        "Eliminamos la dependencia del equipo comercial interno.",
        "Sistematizamos la activación de partners.",
        "Recuperamos ventas perdidas por falta de seguimiento."
      ],
      needs: "Activar red de contactos y generar canal adicional sin aumentar plantilla.",
      motivations: "Escalabilidad sin incrementar costes fijos.",
      objections: "¿Cuánto esfuerzo real implica activarlo?",
      values: {
        tech: "Dashboard en tiempo real y trazabilidad.",
        strat: "Metodología probada de implementación.",
        ops: "Roles definidos y automatización."
      },
      message: "Ya tienes los contactos. Te damos el sistema para convertirlos en ventas."
    },
    {
      id: 1,
      role: "Consultor Senior Independiente",
      segment: "Consultor Senior",
      company: "Boutique de Estrategia",
      responsibility: "Gestión de marca personal y cartera C-level",
      context: {
        situation: "Trabaja por proyectos de alto valor.",
        maturity: "Baja en herramientas, Alta en relaciones.",
        network: "Conoce decisores clave del sector."
      },
      pains: [
        "Estabilizamos ingresos rompiendo la barrera horas/hombre.",
        "Protegemos tu reputación con ejecución impecable.",
        "Facilitamos la monetización elegante de tus introducciones."
      ],
      needs: "Monetizar capital relacional de forma recurrente y segura.",
      motivations: "Generar ingresos pasivos aprovechando su red.",
      objections: "¿Cómo garantizo el trato excelente a mi contacto?",
      values: {
        tech: "Plataforma sencilla para registro y seguimiento.",
        strat: "Alineación con su prestigio profesional.",
        ops: "Soporte estratégico que valide candidatos."
      },
      message: "Monetiza tu capital relacional sin comprometer tu marca personal."
    },
    {
      id: 2,
      role: "Fundador de Comunidad",
      segment: "Emprendedor de Redes",
      company: "Club de Negocios / Networking",
      responsibility: "Crecimiento y valor para miembros",
      context: {
        situation: "Red extensa difícil de escalar económicamente.",
        maturity: "Media. Usa Discord/Slack pero no ventas.",
        network: "Muy activa. Perfiles dinámicos."
      },
      pains: [
        "Organizamos el caos en la gestión de oportunidades.",
        "Aportamos trazabilidad total sobre el cierre de leads.",
        "Aseguramos el cobro de comisiones de forma transparente."
      ],
      needs: "Convertir la capacidad de conectar personas en un modelo de negocio.",
      motivations: "Escalar su comunidad a un hub de negocio real.",
      objections: "¿Mis miembros se sentirán cómodos?",
      values: {
        tech: "IA para asignar roles y optimizar relaciones.",
        strat: "Modelo basado en el éxito de la red.",
        ops: "Facilidad de uso y onboarding rápido."
      },
      message: "Transforma tu capacidad de conectar personas en ingresos predecibles."
    },
    {
      id: 3,
      role: "Head of Partnerships",
      segment: "Perfil Estratégico Tech/SaaS",
      company: "Scale-up Tecnológica",
      responsibility: "Expansión a través de canales indirectos",
      context: {
        situation: "Programa de partners manual y opaco.",
        maturity: "Alta. Tienen herramientas pero canal opaco.",
        network: "Partners tecnológicos y agencias."
      },
      pains: [
        "Aportamos visibilidad total del pipeline indirecto.",
        "Digitalizamos el onboarding eliminando fricción manual.",
        "Convertimos el canal partner en fuente predecible."
      ],
      needs: "Automatizar ciclo de vida del partner y visibilidad pipeline.",
      motivations: "Demostrar la predictibilidad del canal indirecto.",
      objections: "¿Se integrará con nuestro CRM?",
      values: {
        tech: "Integración vía API y automatización.",
        strat: "Escalabilidad territorial rápida.",
        ops: "Visibilidad en tiempo real para ambas partes."
      },
      message: "Escala tu programa de partners con trazabilidad y cero fricción."
    },
    {
      id: 4,
      role: "Managing Partner",
      segment: "Inversor / Business Angel",
      company: "Venture Capital / Family Office",
      responsibility: "Maximizar el valor de participadas",
      context: {
        situation: "Portfolio con crecimiento comercial desigual.",
        maturity: "Alta. Orientado a métricas y exit.",
        network: "Inversores y directivos C-level."
      },
      pains: [
        "Aceleramos el ciclo de ventas de las participadas.",
        "Creamos sinergias comerciales automáticas en el portfolio.",
        "Optimizamos la gestión de contactos de alto nivel."
      ],
      needs: "Acelerar las ventas de participadas usando red compartida.",
      motivations: "Aumento de valoración del portfolio (ROI).",
      objections: "¿Es aplicable a sectores tan diferentes?",
      values: {
        tech: "Consolidación de datos comerciales del ecosistema.",
        strat: "Estructura de incentivos para el portfolio.",
        ops: "Gobierno comercial centralizado."
      },
      message: "Multiplica el valor de tu portfolio activando sus sinergias comerciales."
    }
  ];

  const active = personas[activePersona];

  const painPoints = [
    {
      title: "Problemas Estratégicos",
      items: [
        "Red de contactos infrautilizada (red dormida)",
        "Falta de un sistema estructurado para activar partners",
        "Dependencia excesiva del equipo interno para generar ventas"
      ],
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Problemas Operativos",
      items: [
        "Falta de visibilidad sobre oportunidades externas",
        "Sin trazabilidad ni control del pipeline indirecto",
        "Coordinación ineficiente de colaboradores externos"
      ],
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Problemas de Crecimiento",
      items: [
        "Costes fijos disparados al intentar crecer",
        "Baja escalabilidad del modelo comercial actual",
        "Pérdida de oportunidades por falta de seguimiento"
      ],
      icon: <Target className="w-6 h-6" />
    }
  ];

  const coreValues = [
    {
      title: "Control Total",
      desc: "Saber qué oportunidades existen, en qué estado están y quién las gestiona en tiempo real.",
      icon: <Target className="w-10 h-10" />
    },
    {
      title: "Escalabilidad Real",
      desc: "Crecer sin incrementar costes estructurales ni aumentar la plantilla interna.",
      icon: <Zap className="w-10 h-10" />
    },
    {
      title: "Monetización de Activos",
      desc: "Convertir relaciones pasivas y contactos 'dormidos' en ingresos predecibles.",
      icon: <Target className="w-10 h-10" />
    }
  ];

  const benefits = [
    {
      category: "Estratégicos",
      items: ["Escalado internacional mediante redes", "Creación de ecosistemas comerciales propios", "Posicionamiento como hub de negocio"],
      icon: <Globe className="w-5 h-5" />
    },
    {
      category: "Tecnológicos",
      items: ["IA que asigna roles y optimiza relaciones", "Automatización de flujos comerciales complejos"],
      icon: <Target className="w-5 h-5" />
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-xs font-black uppercase tracking-widest mb-6 ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>
            Soluciones para Directivos
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1]">
            Ya tienes los contactos. <br/>
            <span className={theme === 'dark' ? '!text-white' : 'text-brand-primary'}>Lo que te falta es el sistema</span> <br/>
            para convertirlos en ventas.
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-10 ${theme === 'dark' ? '!text-white font-bold' : 'text-gray-500'}`}>
            Ayudamos a CEOs y Directores Comerciales de empresas B2B a activar su red infrautilizada y escalar sin aumentar costes fijos.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/casos-de-exito')}
              className="px-8 py-4 bg-brand-primary text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-brand-primary/20"
            >
              Ver Casos de Éxito
            </button>
            <button className={`px-8 py-4 rounded-2xl font-black text-sm border hover:bg-gray-100 transition-all ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-200 text-gray-600'}`}>
              Solicitar Demo
            </button>
          </div>
        </motion.div>

        {/* Buyer Personas Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Perfiles que transformamos</h2>
            <p className={`font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-500'}`}>Diferentes realidades, un mismo objetivo: monetizar el capital relacional.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePersona(p.id)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                  activePersona === p.id 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' 
                    : `bg-white dark:bg-brand-dark-card border border-gray-100 dark:border-white/5 hover:border-brand-primary/30 ${theme === 'dark' ? '!text-white' : 'text-gray-500'}`
                }`}
              >
                {p.role}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 rounded-[3.5rem] border backdrop-blur-md ${
                theme === 'dark' ? 'bg-brand-dark-card/60 border-white/10' : 'bg-white/60 border-white shadow-2xl shadow-gray-200/50'
              }`}
            >
              {/* Left Column: Profile Info */}
              <div className="lg:col-span-4 space-y-8">
                <div className="flex items-center gap-5">
                  <div className={`w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>
                    <User className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-brand-dark'}`}>
                      {active.role}
                    </h3>
                    <p className={`font-bold text-sm uppercase tracking-widest ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>
                      {active.segment}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className={`font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-500'}`}>Empresa: <span className={theme === 'dark' ? '!text-white' : 'text-brand-dark'}>{active.company}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className={`font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-500'}`}>Responsabilidad: <span className={theme === 'dark' ? '!text-white' : 'text-brand-dark'}>{active.responsibility}</span></span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                  <h4 className={`text-xs font-black uppercase tracking-widest mb-3 ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>Mensaje Clave</h4>
                  <p className="text-lg font-black italic tracking-tight leading-snug">"{active.message}"</p>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-black uppercase tracking-widest text-xs">Contexto Profesional</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-bold">Situación:</span> {active.context.situation}</li>
                      <li><span className="font-bold">Madurez:</span> {active.context.maturity}</li>
                      <li><span className="font-bold">Red:</span> {active.context.network}</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-brand-primary" />
                      <h4 className="font-black uppercase tracking-widest text-xs">Problemas que Resolvemos</h4>
                    </div>
                    <ul className="space-y-2">
                      {active.pains.map((pain, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-600'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                          {pain}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <h4 className="font-black uppercase tracking-widest text-xs">Necesidades Imprescindibles</h4>
                    </div>
                    <p className={`text-sm font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-600'}`}>{active.needs}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-brand-primary" />
                      <h4 className="font-black uppercase tracking-widest text-xs">Motivaciones de Compra</h4>
                    </div>
                    <p className={`text-sm font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-600'}`}>{active.motivations}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <h4 className="font-black uppercase tracking-widest text-xs">Objeciones Habituales</h4>
                    </div>
                    <p className={`text-sm font-bold italic ${theme === 'dark' ? '!text-white' : 'text-gray-600'}`}>"{active.objections}"</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-brand-secondary" />
                      <h4 className="font-black uppercase tracking-widest text-xs">Qué Valora en la Solución</h4>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li><span className={`font-black ${theme === 'dark' ? '!text-white' : 'text-brand-secondary'}`}>Tecnológico:</span> <span className={theme === 'dark' ? '!text-white font-bold' : ''}>{active.values.tech}</span></li>
                      <li><span className={`font-black ${theme === 'dark' ? '!text-white' : 'text-brand-secondary'}`}>Estratégico:</span> <span className={theme === 'dark' ? '!text-white font-bold' : ''}>{active.values.strat}</span></li>
                      <li><span className={`font-black ${theme === 'dark' ? '!text-white' : 'text-brand-secondary'}`}>Operativo:</span> <span className={theme === 'dark' ? '!text-white font-bold' : ''}>{active.values.ops}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Core Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {coreValues.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] border backdrop-blur-sm ${
                theme === 'dark' ? 'bg-brand-dark-card/40 border-white/10' : 'bg-white/40 border-white shadow-xl shadow-gray-200/20'
              }`}
            >
              <div className={`w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mb-8 ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>
                {value.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{value.title}</h3>
              <p className={`font-bold leading-relaxed ${theme === 'dark' ? '!text-white' : 'text-gray-500'}`}>
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pain Points Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">¿Te resulta familiar?</h2>
            <p className={`font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-500'}`}>Identificamos y resolvemos los cuellos de botella que frenan tu crecimiento.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-[2.5rem] border backdrop-blur-[2px] ${
                  theme === 'dark' ? 'bg-brand-dark-card/30 border-white/5' : 'bg-white/30 border-white'
                }`}
              >
                <div className={`flex items-center gap-3 mb-6 ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>
                  {point.icon}
                  <h4 className="text-lg font-black uppercase tracking-tight">{point.title}</h4>
                </div>
                <ul className="space-y-4">
                  {point.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-brand-primary/40 shrink-0 mt-0.5" />
                        <span className={`text-sm font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-600'}`}>{item}</span>
                      </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`p-12 md:p-20 rounded-[4rem] mb-32 border backdrop-blur-md ${
          theme === 'dark' ? 'bg-brand-dark-card/60 border-white/10' : 'bg-white/60 border-white shadow-2xl shadow-gray-200/50'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8 tracking-tight">Beneficios que impulsan tu rentabilidad</h2>
              <div className="space-y-8">
                {benefits.map((benefit, i) => (
                  <div key={i}>
                    <div className={`flex items-center gap-3 mb-4 ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>
                      {benefit.icon}
                      <h5 className="font-black uppercase tracking-widest text-xs">{benefit.category}</h5>
                    </div>
                    <ul className="space-y-3">
                      {benefit.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className={`font-black ${theme === 'dark' ? '!text-white' : 'text-gray-700'}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center overflow-hidden border border-brand-primary/10">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/business/800/800')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="relative z-10 text-center p-10">
                  <p className="text-3xl font-black italic tracking-tight mb-4">"Estoy dejando dinero sobre la mesa"</p>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-60">— Carlos Martínez, Director Comercial</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SolutionsPage;

