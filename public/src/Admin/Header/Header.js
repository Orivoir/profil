import React from 'react';
import Nav from './Nav/Nav.js';

const Header = ({
  onLogout,
  onShowMessageBox,
  onShowDashboard,
  newMessages
}) => {

  return (
    <header>
      <Nav
        newMessages={newMessages}
        onLogout={onLogout}
        onShowMessageBox={onShowMessageBox}
        onShowDashboard={onShowDashboard}
      />
    </header>
  );
};

export default Header;