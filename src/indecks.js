import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './store';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
const router = (
  <Provider store={store}>
    <Router history={history}>
      { Routes }
    </Router>
  </Provider>
)
render(router, document.getElementById('react-root'));
