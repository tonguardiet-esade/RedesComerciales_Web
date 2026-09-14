import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AppPageProps {
  children: React.ReactNode;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  className?: string;
}

const maxWidthClass = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
};

export const AppPage = ({ children, maxWidth = '4xl', className = '' }: AppPageProps) => (
  <div className={`mosaic-container pt-28 md:pt-32 pb-16 ${maxWidthClass[maxWidth]} ${className}`}>
    {children}
  </div>
);

export const AppCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`border border-mosaic-white-300 bg-mosaic-white-100 p-8 md:p-12 ${className}`}>
    {children}
  </div>
);

export const BackToPortal = ({ label = 'Volver al portal' }: { label?: string }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate('/portal')}
      className="mosaic-link text-mosaic-black-300 hover:text-mosaic-cyan mb-8 cursor-pointer"
    >
      <span className="mosaic-link-icon mr-2">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M9 1L1 9M1 9H7M1 9V3" stroke="currentColor" strokeWidth="1.2"/></svg>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M9 1L1 9M1 9H7M1 9V3" stroke="currentColor" strokeWidth="1.2"/></svg>
      </span>
      {label}
    </button>
  );
};

export const AppSectionTitle = ({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) => (
  <div className="mb-8">
    {label && <p className="mosaic-label text-mosaic-cyan mb-3">{label}</p>}
    <h1 className="mosaic-h3">{title}</h1>
    {subtitle && <p className="mosaic-body text-sm mt-3">{subtitle}</p>}
  </div>
);
