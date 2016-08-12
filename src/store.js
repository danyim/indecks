import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers/index';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
const logger = createLogger();
const middlewares = [thunk];

// Load starter data
import config from './data/config';
import decks from './data/decks';
import samples from './data/samples';

export default function configureStore (initialState = {}, debug = __DEV__)  {
  const createStoreWithMiddleware = applyMiddleware(...middlewares);

  let decksCombined;
  decksCombined = [...decks, ...samples]; // Comment this out for release
  initialState = {
    config,
    decks: decksCombined || []
  };

  const store = (debug ?
    compose(
      createStoreWithMiddleware,
      applyMiddleware(logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f)
    : createStoreWithMiddleware
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
