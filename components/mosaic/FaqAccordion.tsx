import React, { useId, useState } from 'react';

interface FaqAccordionProps {
  items: Array<{ question: string; answer: string }>;
  className?: string;
}

const FaqAccordion = ({ items, className = '' }: FaqAccordionProps) => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`divide-y divide-mosaic-white-300 ${className}`}>
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const isOpen = openIndex === index;

        return (
          <div key={panelId}>
            <button
              type="button"
              id={`${baseId}-trigger-${index}`}
              data-cursor="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full py-8 flex justify-between items-center text-left cursor-pointer group mosaic-focus-ring rounded-sm"
            >
              <span className="text-lg text-mosaic-black-500 font-medium pr-4 group-hover:text-mosaic-cyan transition-colors">
                {item.question}
              </span>
              <span className="mosaic-label text-mosaic-cyan shrink-0 text-xl" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${baseId}-trigger-${index}`}
              hidden={!isOpen}
              className="pb-8"
            >
              <p className="mosaic-body text-mosaic-black-300">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
