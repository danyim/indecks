import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

import config from './data/config';
import decks from './data/decks';
import samples from './data/samples';

// create an object for the default data
let decksCombined;
decksCombined = [...decks, ...samples]; // Comment this out for release
const defaultState = {
  config,
  decks: decksCombined || []
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

// hot reloading reducers
if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  })
}

export default store;
