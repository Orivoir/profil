import React from 'react';

import './Nav.css';

const Nav = ({
  onLogout,
  onShowMessageBox,
  onShowDashboard,
  newMessages
}) => {
  return (
    <nav className="nav">
      <ul>

        <li>
          <button
            type="button"
            onClick={onShowDashboard}
            className="primary"
          >
            dashboard
          </button>
        </li>

        <li className="nav-item-message">
          <button
            type="button"
            onClick={onShowMessageBox}
            className="info"
          >
            {newMessages.length > 0 ? (
              <span className="count-notifs">{newMessages.length}</span>
            ): null}
            messages
          </button>
        </li>

        <li>
          <a href="/" className="btn primary-alt">home</a>
        </li>

        <li>
          <button
            type="button"
            onClick={onLogout}
            className="error"
          >
            logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;