import React from 'react';

import Login from './../Admin/Login/Login.js';
import Dashboard from './../Admin/Dashboard/Dashboard.js';
import MessageBox from './../Admin/MessageBox/MessageBox.js';

export default {

  get LOGIN() {

    return props => (
      <Login  {...props} />
    );
  },

  get DASHBOARD() {

    return props => (
      <Dashboard  {...props} />
    );
  },

  get MESSAGEBOX() {

    return props => (
      <MessageBox {...props} />
    );
  },

  get DEFAULT() {

    return this.LOGIN;
  }

};
