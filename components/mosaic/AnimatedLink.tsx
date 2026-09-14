import React from 'react';
import { Link } from 'react-router-dom';

interface AnimatedLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  to?: string;
  className?: string;
  accent?: boolean;
}

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const AnimatedLink = ({ children, onClick, href, to, className = '', accent }: AnimatedLinkProps) => {
  const classes = `mosaic-link mosaic-focus-ring rounded-sm ${accent ? 'text-mosaic-cyan' : ''} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <span className="mosaic-link-icon">
        <ArrowIcon />
        <ArrowIcon />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} data-cursor="link">
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} data-cursor="link" target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} data-cursor="link">
      {content}
    </button>
  );
};

export default AnimatedLink;
