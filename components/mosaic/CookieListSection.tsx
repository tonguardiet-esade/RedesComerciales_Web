import React from 'react';
import { useLegalContent } from '../../hooks/useLegalContent';

const CookieListSection = () => {
  const { cookieList } = useLegalContent();

  return (
    <div className="legal-cookie-list">
      <h2 className="legal-section-title">{cookieList.title}</h2>
      <p className="legal-cookie-intro">{cookieList.intro}</p>

      {cookieList.categories.map((category) => (
        <div key={category.id} className="legal-cookie-category">
          <h3 className="legal-cookie-category-title">{category.title}</h3>
          <p className="legal-cookie-category-desc">{category.description}</p>

          <div className="legal-cookie-table-wrap">
            <table className="legal-cookie-table">
              <thead>
                <tr>
                  <th>{cookieList.tableHeaders.name}</th>
                  <th>{cookieList.tableHeaders.duration}</th>
                  <th>{cookieList.tableHeaders.description}</th>
                </tr>
              </thead>
              <tbody>
                {category.items.length > 0 ? (
                  category.items.map((item) => (
                    <tr key={item.name}>
                      <td className="legal-cookie-name">{item.name}</td>
                      <td>{item.duration}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="legal-cookie-empty">
                      {cookieList.emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CookieListSection;
