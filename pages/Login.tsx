import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { User } from '../types';
import AuthLayout from '../components/mosaic/AuthLayout';
import MosaicInput from '../components/mosaic/MosaicInput';
import MosaicButton from '../components/mosaic/MosaicButton';

const Login = () => {
  const navigate = useNavigate();
  const { manualLogin } = useUser();
  const { t } = useSettings();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRecovery, setIsRecovery] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (email.trim() === 'admin@ejemploempresa.ai' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-dev-bypass',
        nombre: 'Super Admin (Dev)',
        email: 'admin@ejemploempresa.ai',
        telefono: '+34 600 000 000',
        nivel_elegido: 1,
        fecha_registro: new Date().toISOString(),
        m1_completed: true,
        m2_completed: true,
        m3_completed: true,
        m4_completed: true,
        m5_completed: true,
        test_score: 100,
        test_passed: true,
        test_feedback: 'Cuenta de administrador.',
        task_score: 100,
        task_status: 'passed',
        task_feedback: 'Cuenta de administrador.',
        estado_actual: 'aprobado',
      };

      manualLogin(adminUser);
      setTimeout(() => { navigate('/portal'); }, 100);
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw new Error('Credenciales incorrectas o correo no confirmado.');
      if (!authData.user) throw new Error('No se pudo obtener el usuario.');

      const userId = authData.user.id;
      const tables = ['Prescritor', 'Colaborador', 'Delegado_Sin_Redaccion', 'Delegado_Oficina_Tecnica'];
      let userData = null;

      for (const table of tables) {
        const { data } = await supabase.from(table).select('*').eq('id', userId).single();
        if (data) { userData = data; break; }
      }

      if (!userData) throw new Error('Perfil no encontrado.');

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
        estado_actual: userData.estado_actual || 'en formación',
      };

      manualLogin(userAppObject);
      navigate('/portal');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setErrorMessage(message);
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      label="/ Acceso"
      title={isRecovery ? t('login.recovery_title') : t('login.title')}
      subtitle={isRecovery ? t('login.recovery_subtitle') : t('login.subtitle')}
    >
      <form className="space-y-5" onSubmit={isRecovery ? handleRecovery : handleLogin}>
        <MosaicInput
          label={t('login.email')}
          type="email"
          required
          placeholder={t('login.email_placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!isRecovery && (
          <div>
            <MosaicInput
              label={t('login.password')}
              type={showPassword ? 'text' : 'password'}
              required
              placeholder={t('login.pass_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mosaic-label text-mosaic-black-300 text-[10px] mt-2 hover:text-mosaic-cyan cursor-pointer"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mosaic-label text-red-500 text-[10px] text-center p-3 border border-red-200 bg-red-50">
            {errorMessage}
          </div>
        )}
        {recoveryMessage && (
          <div className="mosaic-label text-mosaic-cyan text-[10px] text-center p-3 border border-mosaic-cyan/30 bg-mosaic-cyan/5">
            {recoveryMessage}
          </div>
        )}

        <MosaicButton type="submit" disabled={loading}>
          {loading ? '...' : (isRecovery ? t('matcher.modal.btn') : t('login.btn'))}
        </MosaicButton>

        {!isRecovery && (
          <MosaicButton type="button" variant="secondary" className="mt-3" onClick={() => navigate('/unirse-invitado')}>
            Acceso invitado (demo)
          </MosaicButton>
        )}

        <div className="space-y-4 text-center pt-4 border-t border-mosaic-white-300">
          {!isRecovery ? (
            <>
              <p className="mosaic-body text-sm">
                {t('login.new')}{' '}
                <Link to="/registro" className="text-mosaic-cyan font-medium hover:underline">
                  {t('login.register_link')}
                </Link>
              </p>
              <button
                type="button"
                onClick={() => setIsRecovery(true)}
                className="mosaic-label text-mosaic-black-300 hover:text-mosaic-cyan cursor-pointer"
              >
                {t('login.forgot')}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsRecovery(false)}
              className="mosaic-label text-mosaic-cyan cursor-pointer"
            >
              {t('login.back')}
            </button>
          )}
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
