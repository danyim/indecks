import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import Routes from './routes';
import './styles/style.styl';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

class Root extends React.Component {
  componentDidMount() {
    // Call an action here if we need to fetch something as the app loads
    // store.dispatch(getDecks());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={Routes} />
      </Provider>
    );
  }
}

export default Root;
