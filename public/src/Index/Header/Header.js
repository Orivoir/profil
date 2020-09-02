import React from 'react';

import Nav from './Nav/Nav.js';
import Title from './Title/Title.js';

import './Header.css';

const Header = ({
  onShowPortfolio,
  onShowContact,
  onShowWelcome
}) => {
  return (
    <header>

      <Title onShowWelcome={onShowWelcome} />

      <Nav
        onShowPortfolio={onShowPortfolio}
        onShowContact={onShowContact}
      />
    </header>
  );
}

export default Header;