import React from 'react';

import './Nav.css';

const Nav = ({
  onShowPortfolio,
  onShowContact
}) => {
  return (
    <nav className="nav">
      <ul>

        <li>
          <button
            type="button"
            onClick={onShowPortfolio}
            className="primary btn-portfolio"
          >
            portfolio
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={onShowContact}
            className="primary-outline btn-contact"
          >
            contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;