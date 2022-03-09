import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.jsx';
import App from './App.jsx';

import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import 'sweetalert2/src/sweetalert2.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


