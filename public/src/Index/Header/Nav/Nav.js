import React from 'react';

const Nav = ({
  onShowPortfolio,
  onShowContact
}) => {
  return (
    <ul className="nav">

      <li>
        <button
          type="button"
          onClick={onShowPortfolio}
        >
          portfolio
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={onShowContact}
        >
          contact
        </button>
      </li>
    </ul>
  );
};

export default Nav;