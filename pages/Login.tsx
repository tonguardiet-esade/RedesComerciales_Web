
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { User } from '../types';

const Login = () => {
  const navigate = useNavigate();
  const { manualLogin } = useUser();
  const { t } = useSettings();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [isRecovery, setIsRecovery] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (email.trim() === 'admin@ejemploempresa.ai' && password === 'admin123') {
        const adminUser: User = {
            id: 'admin-dev-bypass',
            nombre: 'Super Admin (Dev)',
            email: 'admin@ejemploempresa.ai',
            telefono: '+34 600 000 000',
            nivel_elegido: 1, // Ejemplos de venta
            fecha_registro: new Date().toISOString(),
            m1_completed: true, 
            m2_completed: true, 
            m3_completed: true, 
            m4_completed: true,
            m5_completed: true,
            test_score: 100, 
            test_passed: true,
            test_feedback: "Cuenta de administrador.",
            task_score: 100, 
            task_status: 'passed',
            task_feedback: "Cuenta de administrador.",
            estado_actual: 'aprobado'
        };
        
        manualLogin(adminUser);
        setTimeout(() => { navigate('/portal'); }, 100);
        setLoading(false);
        return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw new Error("Credenciales incorrectas o correo no confirmado.");
      if (!authData.user) throw new Error("No se pudo obtener el usuario.");

      const userId = authData.user.id;
      const tables = ["Prescritor", "Colaborador", "Delegado_Sin_Redaccion", "Delegado_Oficina_Tecnica"];
      let userData = null;

      for (const table of tables) {
        const { data } = await supabase.from(table).select('*').eq('id', userId).single();
        if (data) { userData = data; break; }
      }

      if (!userData) throw new Error("Perfil no encontrado.");

      // Fix: Added missing m5_completed property mapped from userData
      const userAppObject: User = {
        id: userData.id,
        nombre: userData.nombre_completo || '',
        email: userData.correo || '',
        telefono: userData.telefono || '',
        nivel_elegido: userData.nivel_elegido || 1,
        fecha_registro: userData.fecha_registro,
        m1_completed: userData.m1_completed || false,
        m2_completed: userData.m2_completed || false,
        m3_completed: userData.m3_completed || false,
        m4_completed: userData.m4_completed || false,
        m5_completed: userData.m5_completed || false,
        test_score: userData.test_score,
        test_passed: userData.test_passed || false,
        test_feedback: userData.test_feedback,
        task_score: userData.task_score,
        task_status: userData.task_status || 'pending',
        task_feedback: userData.task_feedback,
        estado_actual: userData.estado_actual || 'en formación'
      };

      manualLogin(userAppObject);
      navigate('/portal');

    } catch (err: any) {
      setErrorMessage(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setErrorMessage(t('login.recovery_error_email')); return; }
    setLoading(true);
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
        if (error) throw error;
        setRecoveryMessage(t('login.recovery_success'));
    } catch (err: any) {
        setErrorMessage(err.message || "Error.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-darkBg flex items-center justify-center py-12 px-4 transition-colors">
      <div className="max-w-md w-full space-y-10 bg-white dark:bg-brand-darkCard p-10 md:p-12 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <div className="text-center">
            <div className="mx-auto h-20 w-20 mb-6 flex items-center justify-center">
                <img src="/img/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
          <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white tracking-tight mb-3 leading-tight">
            {isRecovery ? t('login.recovery_title') : t('login.title')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium px-4">
            {isRecovery ? t('login.recovery_subtitle') : t('login.subtitle')}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={isRecovery ? handleRecovery : handleLogin}>
          <div className="space-y-5">
            <div>
                <label className="block text-sm font-bold text-[#2a3b5a] dark:text-gray-300 mb-2 ml-1">{t('login.email')}</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
                    </span>
                    <input type="email" required className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-brand-darkBg border border-gray-200 dark:border-gray-700 dark:text-white rounded-lg focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all" placeholder={t('login.email_placeholder')} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>

            {!isRecovery && (
                <div>
                    <label className="block text-sm font-bold text-[#2a3b5a] dark:text-gray-300 mb-2 ml-1">{t('login.password')}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </span>
                        <input type={showPassword ? "text" : "password"} required className="block w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-brand-darkBg border border-gray-200 dark:border-gray-700 dark:text-white rounded-lg focus:ring-1 focus:ring-brand-primary outline-none text-sm transition-all" placeholder={t('login.pass_placeholder')} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-brand-primary" onClick={() => setShowPassword(!showPassword)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                    </div>
                </div>
            )}
          </div>

          {errorMessage && <div className="text-red-600 dark:text-red-400 text-[10px] font-bold text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-500/20 uppercase tracking-widest">{errorMessage}</div>}
          {recoveryMessage && <div className="text-blue-600 dark:text-blue-400 text-[10px] font-bold text-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-500/20 uppercase tracking-widest">{recoveryMessage}</div>}

          <div className="pt-2">
            <button type="submit" disabled={loading} className="w-full py-4 bg-[#7B79F7] text-white font-bold rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-all text-md uppercase tracking-widest">
              {loading ? "..." : (isRecovery ? t('matcher.modal.btn') : t('login.btn'))}
            </button>
          </div>

          {!isRecovery && (
            <div className="pt-0">
               <Link 
                to="/unirse-invitado" 
                className="w-full py-3.5 bg-gray-50 dark:bg-brand-darkCard border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                 Acceso Invitado (Demo)
               </Link>
            </div>
          )}

          <div className="space-y-4 text-center pt-2">
             {!isRecovery && (
                <>
                    <p className="text-[12px] text-gray-500 font-medium">
                        {t('login.new')}{' '}
                        <Link to="/registro" className="text-[#38B2DC] font-bold hover:underline">{t('login.register_link')}</Link>
                    </p>
                    <button type="button" onClick={() => setIsRecovery(true)} className="text-[#7B79F7] text-xs font-bold hover:underline">{t('login.forgot')}</button>
                </>
             )}
             {isRecovery && <button type="button" onClick={() => setIsRecovery(false)} className="text-[#7B79F7] text-xs font-bold hover:underline">{t('login.back')}</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
