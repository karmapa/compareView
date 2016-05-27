import 'babel-polyfill';
import 'bootstrap-css';
import './index.css';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App.js';

render(
    <App />,
  document.getElementById('root')
);
