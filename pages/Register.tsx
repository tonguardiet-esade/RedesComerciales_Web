import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { UserLevel } from '../types';
import AuthLayout from '../components/mosaic/AuthLayout';
import MosaicInput from '../components/mosaic/MosaicInput';
import MosaicButton from '../components/mosaic/MosaicButton';

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

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nivel, setNivel] = useState('1');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const roles = [
    { id: '1', translationKey: 'register.role.1', tableName: 'Prescritor' },
    { id: '2', translationKey: 'register.role.2', tableName: 'Colaborador' },
    { id: '3', translationKey: 'register.role.3', tableName: 'Delegado_Sin_Redaccion' },
    { id: '4', translationKey: 'register.role.4', tableName: 'Delegado_Oficina_Tecnica' },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMessage('');
    if (password !== confirmPassword) { setErrorMessage('Las contraseñas no coinciden.'); return; }
    setLoading(true);

    try {
      const selectedRole = roles.find((r) => r.id === nivel);
      const targetTable = selectedRole?.tableName || 'Prescritor';
      const nivelInt = parseInt(nivel);
      const fullPhone = `${selectedCountry.prefix} ${telefono}`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nombre_completo: nombre, telefono: fullPhone, nivel_seleccionado: selectedRole ? t(selectedRole.translationKey) : '1' },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      const authUser = data.user;
      if (!authUser) throw new Error('No user returned');

      const { error: insertError } = await supabase
        .from(targetTable)
        .insert({
          id: authUser.id,
          nombre_completo: nombre,
          correo: email,
          telefono: fullPhone,
          contrasena: password,
          nivel_elegido: nivelInt,
          estado_actual: 'en formación',
        });

      if (insertError && insertError.code !== '23505') throw insertError;

      if (!data.session) {
        setEmailSent(true);
      } else {
        manualLogin({
          id: authUser.id,
          nombre,
          email,
          telefono: fullPhone,
          nivel_elegido: nivelInt as UserLevel,
          fecha_registro: new Date().toISOString(),
          m1_completed: false,
          m2_completed: false,
          m3_completed: false,
          m4_completed: false,
          test_score: null,
          test_passed: false,
          task_score: null,
          task_status: 'pending',
          estado_actual: 'en formación',
        });
        navigate('/portal');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout
        label="/ Registro"
        title={t('register.email_sent_title')}
        subtitle={`${t('register.email_sent_desc')} ${email}.`}
      >
        <MosaicButton type="button" onClick={() => navigate('/login')}>
          Ir al login
        </MosaicButton>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      label="/ Registro"
      title={t('register.title')}
      subtitle={t('register.subtitle')}
    >
      <form className="space-y-5" onSubmit={handleRegister}>
        <MosaicInput
          label={t('register.name')}
          type="text"
          required
          placeholder={t('register.name_placeholder')}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <MosaicInput
          label={t('register.email')}
          type="email"
          required
          placeholder={t('register.email_placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <label className="mosaic-label text-mosaic-black-300 block mb-2">{t('register.phone')}</label>
          <div className="flex border border-mosaic-white-300 bg-mosaic-white-200">
            <button
              type="button"
              onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
              className="px-3 flex items-center gap-2 border-r border-mosaic-white-300 cursor-pointer hover:bg-mosaic-white-300 transition-colors"
            >
              <img src={selectedCountry.flag} alt={selectedCountry.code} className="w-5 h-auto" />
              <span className="mosaic-label text-mosaic-black-500 text-[10px]">{selectedCountry.prefix}</span>
            </button>
            <input
              type="text"
              required
              placeholder={t('register.phone_placeholder')}
              className="flex-1 px-4 py-3 bg-transparent text-mosaic-black-500 outline-none text-sm"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          {isCountryMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-mosaic-white-100 border border-mosaic-white-300 shadow-lg z-50 max-h-60 overflow-y-auto">
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-mosaic-white-200 transition-colors text-left cursor-pointer"
                  onClick={() => { setSelectedCountry(c); setIsCountryMenuOpen(false); }}
                >
                  <img src={c.flag} alt={c.code} className="w-5 h-auto" />
                  <div>
                    <span className="mosaic-label text-mosaic-cyan text-[10px] block">{c.prefix}</span>
                    <span className="mosaic-body text-xs">{c.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="mosaic-label text-mosaic-black-300 block mb-2">{t('register.level')}</label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="block w-full px-4 py-3 bg-mosaic-white-200 border border-mosaic-white-300 text-mosaic-black-500 mosaic-body text-sm outline-none focus:border-mosaic-cyan cursor-pointer"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{t(role.translationKey)}</option>
            ))}
          </select>
        </div>

        <div>
          <MosaicInput
            label={t('register.pass')}
            type={showPassword ? 'text' : 'password'}
            required
            placeholder={t('register.pass_placeholder')}
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

        <MosaicInput
          label={t('register.pass_confirm')}
          type={showPassword ? 'text' : 'password'}
          required
          placeholder={t('register.pass_placeholder')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(password && confirmPassword && password !== confirmPassword)}
        />

        {errorMessage && (
          <div className="mosaic-label text-red-500 text-[10px] text-center p-3 border border-red-200 bg-red-50">
            {errorMessage}
          </div>
        )}

        <MosaicButton type="submit" disabled={loading}>
          {loading ? '...' : t('register.btn')}
        </MosaicButton>

        <p className="mosaic-body text-sm text-center pt-4 border-t border-mosaic-white-300">
          {t('register.existing')}{' '}
          <Link to="/login" className="text-mosaic-cyan font-medium hover:underline">
            {t('register.login_link')}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
