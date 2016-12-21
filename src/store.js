import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
// TODO: Not really using thunk until we interface with a backend
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './reducers/index';
import config from './data/config';
import decks from './data/decks';
import samples from './data/samples';

const logger = createLogger();
const envMiddlewares = {
  dev: [logger], // thunk would go in here
  prod: [] // thunk would go in here
};

/**
 * Applies reducers, middleware, and enhancers to the store
 * @param  {Object} initialState Initial state when the app loads
 * @param  {Boolean} debug       Flag for debug mode
 * @return {Object}              A store object for Redux
 */
export default function configureStore(initialState = {}, debug = __DEV__) {
  const middlewares = debug ?
    applyMiddleware(...envMiddlewares.dev)
    : applyMiddleware(...envMiddlewares.prod);
  const storeEnhancers = debug ?
      compose(middlewares, autoRehydrate(),
        window.devToolsExtension ? window.devToolsExtension() : f => f)
      : compose(middlewares, autoRehydrate());

  if (debug) {
    console.warn('DEVELOPMENT: In debug mode');
  }

  let decksCombined = null;
  // decksCombined = [...decks, ...samples]; // Comment this out for release
  // decksCombined = [...samples]; // Comment this out for release
  initialState = {
    config,
    decks: decksCombined || [],
  };

  const store = createStore(
    rootReducer,
    initialState,
    storeEnhancers
  );

  // Loads state from local storage
  persistStore(store, {
    blacklist: ['routing', 'form'] // Except these objects
  });

  // TODO: Does this belong here or in root.js?
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
