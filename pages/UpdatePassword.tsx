import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/mosaic/AuthLayout';
import MosaicInput from '../components/mosaic/MosaicInput';
import MosaicButton from '../components/mosaic/MosaicButton';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ text: 'Las contraseñas no coinciden', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      const user = data.user;
      if (user) {
        const tables = ['Prescritor', 'Colaborador', 'Delegado_Sin_Redaccion', 'Delegado_Oficina_Tecnica'];

        for (const table of tables) {
          const { count } = await supabase
            .from(table)
            .select('id', { count: 'exact', head: true })
            .eq('id', user.id);

          if (count && count > 0) {
            const { error: dbError } = await supabase
              .from(table)
              .update({ contrasena: password })
              .eq('id', user.id);

            if (dbError) {
              console.error(`Error actualizando tabla ${table}`, dbError);
            }
            break;
          }
        }
      }

      setMessage({ text: 'Contraseña actualizada correctamente. Redirigiendo...', type: 'success' });

      setTimeout(() => {
        navigate('/portal');
      }, 2000);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Error al actualizar contraseña';
      setMessage({ text, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      label="/ Recuperación"
      title="Nueva contraseña"
      subtitle="Introduce tu nueva contraseña para recuperar el acceso."
    >
      <form onSubmit={handleUpdate} className="space-y-5">
        <MosaicInput
          label="Nueva contraseña"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <MosaicInput
          label="Repetir contraseña"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          error={Boolean(password && confirmPassword && password !== confirmPassword)}
        />

        {message && (
          <div className={`mosaic-label text-[10px] text-center p-3 border ${
            message.type === 'success'
              ? 'text-mosaic-cyan border-mosaic-cyan/30 bg-mosaic-cyan/5'
              : 'text-red-500 border-red-200 bg-red-50'
          }`}>
            {message.text}
          </div>
        )}

        <MosaicButton type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Guardar contraseña'}
        </MosaicButton>
      </form>
    </AuthLayout>
  );
};

export default UpdatePassword;
