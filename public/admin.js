import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/Admin/App.js';

import api from './src/api/admin.js';

import mainContents from './src/main-content/admin.meta.js';

import './base.css';

ReactDOM.render(
  <App
    api={api}
    mainContents={mainContents}
  />,
  document.querySelector('main')
);
