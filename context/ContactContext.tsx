import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactContextType {
  openContact: () => void;
}

const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const openContact = useCallback(() => {
    navigate('/contacto');
  }, [navigate]);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    return {
      openContact: () => {},
    };
  }
  return ctx;
};
