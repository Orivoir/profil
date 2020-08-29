import React from 'react';
import Nav from './Nav/Nav.js';

const Header = ({
  onLogout,
  onShowMessageBox,
  onShowDashboard,
}) => {
  return (
    <header>
      <Nav
        onLogout={onLogout}
        onShowMessageBox={onShowMessageBox}
        onShowDashboard={onShowDashboard}
      />
    </header>
  );
};

export default Header;