
import React from 'react';
import { useSettings } from '../context/SettingsContext';
import MosaicModal from './mosaic/MosaicModal';
import ContactForm from './mosaic/ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const { t } = useSettings();

  return (
    <MosaicModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('contact.title')}
      subtitle={t('contact.subtitle')}
      maxWidth="lg"
    >
      <div className="p-6 md:p-8">
        <ContactForm className="!p-0 !border-0 !bg-transparent !shadow-none" />
      </div>
    </MosaicModal>
  );
};

export default ContactModal;
