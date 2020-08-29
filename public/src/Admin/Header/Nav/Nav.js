import React from 'react';

const Nav = ({
  onLogout,
  onShowMessageBox,
  onShowDashboard
}) => {
  return (
    <ul>

      <li>
        <button
          type="button"
          onClick={onShowDashboard}
        >
          dashboard
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={onShowMessageBox}
        >
          messages
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={onLogout}
        >
          logout
        </button>
      </li>
    </ul>
  );
};

export default Nav;