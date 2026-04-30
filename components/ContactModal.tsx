
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const { theme } = useSettings();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    mensaje: '',
    privacyAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) return;
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ nombre: '', apellidos: '', email: '', telefono: '', mensaje: '', privacyAccepted: false });
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-brand-darkCard border border-white/5' : 'bg-white'
            }`}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>

            <div className="p-8 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className={`text-2xl font-black mb-4 uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-brand-dark'}`}>¡Mensaje enviado!</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Gracias por contactar con Redescomerciales.ai. Nuestro equipo te contactará en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-brand-secondary'}`}>
                      Nombre<span className="text-brand-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg border transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-brand-darkBg border-white/10 focus:border-brand-primary text-white' 
                          : 'bg-[#F2F6FA] border-gray-200 focus:border-brand-primary text-brand-dark'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-brand-secondary'}`}>
                      Apellidos<span className="text-brand-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.apellidos}
                      onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg border transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-brand-darkBg border-white/10 focus:border-brand-primary text-white' 
                          : 'bg-[#F2F6FA] border-gray-200 focus:border-brand-primary text-brand-dark'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-brand-secondary'}`}>
                      Correo<span className="text-brand-primary">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg border transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-brand-darkBg border-white/10 focus:border-brand-primary text-white' 
                          : 'bg-[#F2F6FA] border-gray-200 focus:border-brand-primary text-brand-dark'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-brand-secondary'}`}>
                      Teléfono<span className="text-brand-primary">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg border transition-all outline-none ${
                        theme === 'dark' 
                          ? 'bg-brand-darkBg border-white/10 focus:border-brand-primary text-white' 
                          : 'bg-[#F2F6FA] border-gray-200 focus:border-brand-primary text-brand-dark'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-brand-secondary'}`}>
                      Deja tu comentario<span className="text-brand-primary">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg border transition-all outline-none resize-none ${
                        theme === 'dark' 
                          ? 'bg-brand-darkBg border-white/10 focus:border-brand-primary text-white' 
                          : 'bg-[#F2F6FA] border-gray-200 focus:border-brand-primary text-brand-dark'
                      }`}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-6">
                      <input
                        required
                        type="checkbox"
                        id="privacy"
                        checked={formData.privacyAccepted}
                        onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                      />
                    </div>
                    <label htmlFor="privacy" className={`text-lg font-medium flex-1 ${theme === 'dark' ? 'text-white/90' : 'text-brand-secondary'}`}>
                      He leído y acepto la <Link to="/politica-privacidad" className="text-brand-primary hover:underline underline-offset-4 decoration-2">política de privacidad</Link>.<span className="text-brand-primary">*</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="px-10 py-4 bg-brand-primary text-white rounded-lg font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                      ) : (
                        "Enviar"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
