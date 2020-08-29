import React from 'react';

import Nav from './Nav/Nav.js';

const Header = ({
  onShowPortfolio,
  onShowContact
}) => {
  return (
    <header>
      {/* title */}

      <Nav
        onShowPortfolio={onShowPortfolio}
        onShowContact={onShowContact}
      />
    </header>
  );
}

export default Header;