import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/Index/App.js';

import api from './src/api/index.js';
import mainContents from './src/main-content/index.meta.js';

ReactDOM.render(
  <App
    api={api}
    mainContents={mainContents}
  />,
  document.querySelector('main')
);
