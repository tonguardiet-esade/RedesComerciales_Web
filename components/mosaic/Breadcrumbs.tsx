import React from 'react';
import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  path?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={`mb-8 md:mb-10 ${className}`}>
    <ol className="flex flex-wrap items-center gap-2 mosaic-label text-[10px] text-mosaic-black-300">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="hover:text-mosaic-cyan transition-colors mosaic-focus-ring rounded-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-mosaic-cyan' : undefined} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span aria-hidden="true" className="opacity-40">/</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
