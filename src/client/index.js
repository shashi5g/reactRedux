import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css'
import App from '../App';
import configureStore from './store';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
