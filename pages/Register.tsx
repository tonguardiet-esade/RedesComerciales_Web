
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { UserLevel } from '../types';

const countries = [
  { code: 'ES', name: 'España', flag: 'https://flagcdn.com/w20/es.png', prefix: '+34' },
  { code: 'AD', name: 'Andorra', flag: 'https://flagcdn.com/w20/ad.png', prefix: '+376' },
  { code: 'PT', name: 'Portugal', flag: 'https://flagcdn.com/w20/pt.png', prefix: '+351' },
  { code: 'FR', name: 'Francia', flag: 'https://flagcdn.com/w20/fr.png', prefix: '+33' },
  { code: 'IT', name: 'Italia', flag: 'https://flagcdn.com/w20/it.png', prefix: '+39' },
  { code: 'DE', name: 'Alemania', flag: 'https://flagcdn.com/w20/de.png', prefix: '+49' },
  { code: 'GB', name: 'Reino Unido', flag: 'https://flagcdn.com/w20/gb.png', prefix: '+44' },
  { code: 'MX', name: 'México', flag: 'https://flagcdn.com/w20/mx.png', prefix: '+52' },
  { code: 'AR', name: 'Argentina', flag: 'https://flagcdn.com/w20/ar.png', prefix: '+54' },
  { code: 'CO', name: 'Colombia', flag: 'https://flagcdn.com/w20/co.png', prefix: '+57' },
  { code: 'CL', name: 'Chile', flag: 'https://flagcdn.com/w20/cl.png', prefix: '+56' },
  { code: 'PE', name: 'Perú', flag: 'https://flagcdn.com/w20/pe.png', prefix: '+51' },
  { code: 'VE', name: 'Venezuela', flag: 'https://flagcdn.com/w20/ve.png', prefix: '+58' },
  { code: 'EC', name: 'Ecuador', flag: 'https://flagcdn.com/w20/ec.png', prefix: '+593' },
  { code: 'UY', name: 'Uruguay', flag: 'https://flagcdn.com/w20/uy.png', prefix: '+598' },
  { code: 'PY', name: 'Paraguay', flag: 'https://flagcdn.com/w20/py.png', prefix: '+595' },
  { code: 'BO', name: 'Bolivia', flag: 'https://flagcdn.com/w20/bo.png', prefix: '+591' },
  { code: 'PA', name: 'Panamá', flag: 'https://flagcdn.com/w20/pa.png', prefix: '+507' },
  { code: 'CR', name: 'Costa Rica', flag: 'https://flagcdn.com/w20/cr.png', prefix: '+506' },
  { code: 'DO', name: 'Rep. Dominicana', flag: 'https://flagcdn.com/w20/do.png', prefix: '+1' },
  { code: 'SV', name: 'El Salvador', flag: 'https://flagcdn.com/w20/sv.png', prefix: '+503' },
  { code: 'GT', name: 'Guatemala', flag: 'https://flagcdn.com/w20/gt.png', prefix: '+502' },
  { code: 'HN', name: 'Honduras', flag: 'https://flagcdn.com/w20/hn.png', prefix: '+504' },
  { code: 'US', name: 'USA', flag: 'https://flagcdn.com/w20/us.png', prefix: '+1' },
  { code: 'BR', name: 'Brasil', flag: 'https://flagcdn.com/w20/br.png', prefix: '+55' },
];

const Register = () => {
  const navigate = useNavigate();
  const { manualLogin } = useUser();
  const { t } = useSettings();
  
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [nivel, setNivel] = useState("1");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const roles = [
    { id: "1", translationKey: "register.role.1", tableName: "Prescritor" },
    { id: "2", translationKey: "register.role.2", tableName: "Colaborador" },
    { id: "3", translationKey: "register.role.3", tableName: "Delegado_Sin_Redaccion" },
    { id: "4", translationKey: "register.role.4", tableName: "Delegado_Oficina_Tecnica" }
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMessage("");
    if (password !== confirmPassword) { setErrorMessage("Las contraseñas no coinciden."); return; }
    setLoading(true);

    try {
      const selectedRole = roles.find(r => r.id === nivel);
      const targetTable = selectedRole?.tableName || "Prescritor";
      const nivelInt = parseInt(nivel);
      const fullPhone = `${selectedCountry.prefix} ${telefono}`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nombre_completo: nombre, telefono: fullPhone, nivel_seleccionado: selectedRole ? t(selectedRole.translationKey) : "1" },
          emailRedirectTo: window.location.origin
        }
      });

      if (error) throw error;
      const authUser = data.user;
      if (!authUser) throw new Error("No user returned");

      const { error: insertError } = await supabase
        .from(targetTable)
        .insert({
          id: authUser.id,
          nombre_completo: nombre,
          correo: email,
          telefono: fullPhone,
          contrasena: password,
          nivel_elegido: nivelInt,
          estado_actual: 'en formación'
        });

      if (insertError && insertError.code !== '23505') throw insertError;
      
      if (!data.session) {
          setEmailSent(true);
      } else {
          manualLogin({
            id: authUser.id, nombre, email, telefono: fullPhone,
            nivel_elegido: nivelInt as UserLevel, fecha_registro: new Date().toISOString(),
            m1_completed: false, m2_completed: false, m3_completed: false, m4_completed: false,
            test_score: null, test_passed: false, task_score: null, task_status: 'pending', estado_actual: 'en formación'
          });
          navigate('/portal');
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
      return (
        <div className="min-h-screen bg-brand-light dark:bg-brand-darkBg flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-brand-darkCard p-12 rounded-xl shadow-2xl text-center border border-gray-100 dark:border-gray-800">
                <div className="mx-auto h-16 w-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white mb-4 uppercase">{t('register.email_sent_title')}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10">{t('register.email_sent_desc')} <span className="font-bold text-brand-primary">{email}</span>.</p>
                <Link to="/login" className="block w-full py-4 bg-[#7B79F7] text-white font-bold rounded-lg shadow-xl uppercase text-sm tracking-widest text-center">Ir al Login</Link>
            </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-darkBg flex items-center justify-center py-12 px-4 transition-colors">
      <div className="max-w-md w-full space-y-10 bg-white dark:bg-brand-darkCard p-10 md:p-12 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-fade-in relative z-10">
        
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-[#7B79F7]/10 rounded-xl flex items-center justify-center mb-8 text-[#7B79F7]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            </div>
          <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white tracking-tight mb-3 leading-tight">
            {t('register.title')}
          </h2>
          <p className={`text-sm font-medium leading-relaxed px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
            {t('register.subtitle')}
          </p>
        </div>
        
        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          {/* Nombre Completo */}
          <div>
            <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-white' : 'text-[#2a3b5a]'}`}>{t('register.name')}</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <input type="text" required placeholder={t('register.name_placeholder')} className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-brand-darkBg border border-gray-200 dark:border-gray-700 dark:text-white rounded-lg focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-white' : 'text-[#2a3b5a]'}`}>{t('register.email')}</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
                </span>
                <input type="email" required placeholder={t('register.email_placeholder')} className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-brand-darkBg border border-gray-200 dark:border-gray-700 dark:text-white rounded-lg focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Teléfono */}
          <div className="relative">
            <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-white' : 'text-[#2a3b5a]'}`}>{t('register.phone')}</label>
            <div className="flex w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-brand-darkBg overflow-visible">
                <div className="px-3 flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 transition-colors rounded-l-lg" onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}>
                    <img src={selectedCountry.flag} alt={selectedCountry.code} className="w-5 h-auto rounded-sm" />
                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-[#2a3b5a]'}`}>{selectedCountry.prefix}</span>
                </div>
                <input type="text" required placeholder={t('register.phone_placeholder')} className="flex-1 px-4 py-3 bg-transparent text-[#2a3b5a] dark:text-white outline-none text-sm" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            {isCountryMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#2a364e] border border-gray-100 dark:border-gray-700 rounded-lg shadow-2xl z-50 overflow-y-auto max-h-60 animate-fade-in custom-scrollbar">
                {countries.map((c) => (
                  <button key={c.code} type="button" className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-50 dark:border-gray-800 last:border-0" onClick={() => { setSelectedCountry(c); setIsCountryMenuOpen(false); }}>
                    <img src={c.flag} alt={c.code} className="w-5 h-auto rounded-sm shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-brand-primary leading-none mb-1">{c.prefix}</span>
                      <span className="text-[11px] font-bold text-[#2a3b5a] dark:text-white leading-none">{c.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nivel Deseado */}
          <div>
            <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-white' : 'text-[#2a3b5a]'}`}>{t('register.level')}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </span>
              <select value={nivel} onChange={(e) => setNivel(e.target.value)} className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-brand-darkBg border border-gray-200 dark:border-gray-700 text-brand-dark dark:text-white rounded-lg focus:ring-1 focus:ring-brand-primary outline-none text-sm font-bold appearance-none cursor-pointer">
                  {roles.map((role) => <option key={role.id} value={role.id} className="dark:bg-[#2a364e]">{t(role.translationKey)}</option>)}
              </select>
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-white' : 'text-[#2a3b5a]'}`}>{t('register.pass')}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input type={showPassword ? "text" : "password"} required placeholder={t('register.pass_placeholder')} className="block w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-brand-darkBg border border-gray-200 dark:border-gray-700 text-brand-dark dark:text-white rounded-lg focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-brand-primary" onClick={() => setShowPassword(!showPassword)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
            </div>
          </div>

          {/* Repetir Contraseña (AÑADIDO) */}
          <div>
            <label className={`block text-sm font-bold mb-2 ml-1 ${theme === 'dark' ? 'text-white' : 'text-[#2a3b5a]'}`}>{t('register.pass_confirm')}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input type={showPassword ? "text" : "password"} required placeholder={t('register.pass_placeholder')} className={`block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-brand-darkBg border ${password && confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} text-brand-dark dark:text-white rounded-lg focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          {errorMessage && <div className="text-red-500 dark:text-red-400 text-[10px] font-black text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-500/20 uppercase tracking-widest animate-pulse">{errorMessage}</div>}

          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full py-4 bg-[#7B79F7] text-white font-bold rounded-lg shadow-xl hover:brightness-105 active:scale-95 transition-all text-md uppercase tracking-widest">
              {loading ? "..." : t('register.btn')}
            </button>
          </div>
          
          <div className="text-center pt-2">
            <p className="text-[12px] text-gray-500 font-medium">
               {t('register.existing')} <Link to="/login" className="text-[#38B2DC] font-bold hover:underline">{t('register.login_link')}</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
