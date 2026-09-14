import React from 'react';
import logo from '../../img/logo.svg';
import AnimatedLink from './AnimatedLink';

interface AuthLayoutProps {
  label?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backLink?: { to: string; label: string };
}

const AuthLayout = ({ label, title, subtitle, children, backLink }: AuthLayoutProps) => (
  <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 md:py-24 mosaic-container">
    <div className="w-full max-w-md">
      {backLink && (
        <div className="mb-8">
          <AnimatedLink onClick={() => { window.location.hash = backLink.to; }}>
            {backLink.label}
          </AnimatedLink>
        </div>
      )}

      <div className="border border-mosaic-white-300 bg-mosaic-white-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <img src={logo} alt="" className="w-12 h-12 mx-auto mb-6" />
          {label && <p className="mosaic-label text-mosaic-cyan mb-4">{label}</p>}
          <h1 className="mosaic-h3 mb-3">{title}</h1>
          {subtitle && <p className="mosaic-body text-sm">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
