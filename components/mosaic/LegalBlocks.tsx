import React from 'react';
import type { LegalBlock, LegalListItem } from '../../lib/i18n/legal/types';

function renderListItem(item: LegalListItem, key: number) {
  if (typeof item === 'string') {
    return <li key={key}>{item}</li>;
  }

  return (
    <li key={key}>
      <strong>{item.strong}</strong>
      {item.text}
    </li>
  );
}

const LegalBlocks = ({ blocks }: { blocks: LegalBlock[] }) => (
  <>
    {blocks.map((block, index) => {
      switch (block.type) {
        case 'h2':
          return (
            <h2 key={index} className="legal-section-title">
              {block.text}
            </h2>
          );
        case 'p':
          return <p key={index}>{block.text}</p>;
        case 'ul':
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => renderListItem(item, itemIndex))}
            </ul>
          );
        case 'links':
          return (
            <React.Fragment key={index}>
              {block.intro ? <p>{block.intro}</p> : null}
              <ul>
                {block.items.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          );
        case 'note':
          return (
            <p key={index} className="legal-note">
              {block.text}
            </p>
          );
        default:
          return null;
      }
    })}
  </>
);

export default LegalBlocks;
