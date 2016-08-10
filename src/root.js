import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './store';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

class Root extends React.Component {
  componentDidMount() {
    // Call an action here if we need to fetch something as the app loads
    // store.dispatch(getPodcasts());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          { Routes }
        </Router>
      </Provider>
    );
  }
}

export default Root;
