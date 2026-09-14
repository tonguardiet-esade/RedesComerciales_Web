import React, { useId, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import MosaicInput from './MosaicInput';
import { ANALYTICS_EVENTS, trackEvent } from '../../lib/analytics';
import { getStoredUtmParams } from '../../lib/utm';
import MosaicButton from './MosaicButton';

type FormFields = {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  privacyAccepted: boolean;
};

type FieldKey = keyof Omit<FormFields, 'privacyAccepted'>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM: FormFields = {
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: '',
  privacyAccepted: false,
};

/** Simula envío al backend. Sustituir por llamada API real. */
const submitContactForm = async (_data: FormFields): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
};

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const { t } = useSettings();
  const messageId = useId();
  const messageErrorId = `${messageId}-error`;
  const [formData, setFormData] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldKey | 'privacy', string>>>({});
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = (data: FormFields) => {
    const next: Partial<Record<FieldKey | 'privacy', string>> = {};
    const requiredFields: FieldKey[] = ['nombre', 'apellidos', 'email', 'telefono', 'asunto', 'mensaje'];

    requiredFields.forEach((field) => {
      if (!data[field].trim()) next[field] = t('contact.errors.required');
    });

    if (data.email.trim() && !EMAIL_RE.test(data.email.trim())) {
      next.email = t('contact.errors.email');
    }

    if (!data.privacyAccepted) {
      next.privacy = t('contact.errors.privacy');
    }

    return next;
  };

  const handleBlur = (field: FieldKey) => {
    if (!touched) return;
    const next = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setSubmitError(false);

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    trackEvent(ANALYTICS_EVENTS.formSubmit, {
      form: 'contact',
      ...getStoredUtmParams(),
    });
    try {
      await submitContactForm(formData);
      trackEvent(ANALYTICS_EVENTS.formSuccess, {
        form: 'contact',
        ...getStoredUtmParams(),
      });
      setIsSuccess(true);
      setFormData(EMPTY_FORM);
      setErrors({});
      setTouched(false);
    } catch {
      trackEvent(ANALYTICS_EVENTS.formError, { form: 'contact' });
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`section-glass-card p-8 md:p-10 text-center ${className}`}>
        <div className="w-16 h-16 bg-mosaic-green/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-mosaic-green" />
        </div>
        <h3 className="mosaic-h4 mb-4">{t('contact.success.title')}</h3>
        <p className="mosaic-body text-sm max-w-md mx-auto">{t('contact.success.text')}</p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-8 mosaic-label text-mosaic-cyan hover:opacity-80 transition-opacity cursor-pointer"
        >
          {t('contact.success.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className={`section-glass-card p-6 md:p-8 lg:p-10 space-y-5 ${className}`}
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <MosaicInput
          label={t('contact.firstName')}
          required
          value={formData.nombre}
          placeholder={t('contact.firstName.placeholder')}
          error={Boolean(errors.nombre)}
          errorMessage={errors.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          onBlur={() => handleBlur('nombre')}
        />
        <MosaicInput
          label={t('contact.lastName')}
          required
          value={formData.apellidos}
          placeholder={t('contact.lastName.placeholder')}
          error={Boolean(errors.apellidos)}
          errorMessage={errors.apellidos}
          onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
          onBlur={() => handleBlur('apellidos')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <MosaicInput
          label={t('contact.email')}
          type="email"
          required
          value={formData.email}
          placeholder={t('contact.email.placeholder')}
          error={Boolean(errors.email)}
          errorMessage={errors.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={() => handleBlur('email')}
        />
        <MosaicInput
          label={t('contact.phone')}
          type="tel"
          required
          value={formData.telefono}
          placeholder={t('contact.phone.placeholder')}
          error={Boolean(errors.telefono)}
          errorMessage={errors.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          onBlur={() => handleBlur('telefono')}
        />
      </div>

      <MosaicInput
        label={t('contact.subject')}
        required
        value={formData.asunto}
        placeholder={t('contact.subject.placeholder')}
        error={Boolean(errors.asunto)}
        errorMessage={errors.asunto}
        onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
        onBlur={() => handleBlur('asunto')}
      />

      <div>
        <label htmlFor={messageId} className="mosaic-label text-mosaic-black-300 block mb-2">{t('contact.message')}</label>
        <textarea
          id={messageId}
          required
          rows={5}
          value={formData.mensaje}
          placeholder={t('contact.message.placeholder')}
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={errors.mensaje ? messageErrorId : undefined}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
          onBlur={() => handleBlur('mensaje')}
          className={`app-input resize-none mosaic-focus-ring transition-colors hover:border-mosaic-cyan/40 focus:border-mosaic-cyan ${
            errors.mensaje ? 'border-red-400 focus:border-red-400' : ''
          }`}
        />
        {errors.mensaje && (
          <p id={messageErrorId} className="mt-1.5 text-xs text-red-500" role="alert">{errors.mensaje}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            required
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) => {
              setFormData({ ...formData, privacyAccepted: e.target.checked });
              if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: undefined }));
            }}
            className="w-4 h-4 mt-0.5 accent-mosaic-cyan"
          />
          <span className="mosaic-body text-sm group-hover:text-mosaic-black-500 transition-colors">
            {t('contact.privacy')}{' '}
            <Link to="/politica-privacidad" className="text-mosaic-cyan hover:underline">
              {t('contact.privacyLink')}
            </Link>. *
          </span>
        </label>
        {errors.privacy && (
          <p className="mt-1.5 text-xs text-red-500" role="alert">{errors.privacy}</p>
        )}
      </div>

      {submitError && (
        <div className="flex items-start gap-3 p-4 border border-red-400/40 bg-red-500/5 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="mosaic-body text-sm">{t('contact.error.submit')}</p>
        </div>
      )}

      <MosaicButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('contact.sending') : t('contact.submit')}
      </MosaicButton>
    </form>
  );
};

export default ContactForm;
