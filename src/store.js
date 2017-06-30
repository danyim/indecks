/* globals __DEVELOPMENT__ */
import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
// import rootSaga from './sagas/index'
import { combineListeners } from './listenerMiddleware'
import { rootReducer, rootSaga, rootListener } from './redux/index'
import config from './data/config'
// import decks from './data/decks';
// import samples from './data/samples';

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()
const listenerMiddlewares = combineListeners(rootListener)
const envMiddlewares = {
  dev: [logger, thunk, sagaMiddleware, ...listenerMiddlewares],
  prod: [thunk, sagaMiddleware, ...listenerMiddlewares]
}

/**
 * Applies reducers, middleware, and enhancers to the store
 * @param  {Object} initialState Initial state when the app loads
 * @param  {Boolean} debug       Flag for debug mode
 * @return {Object}              A store object for Redux
 */
export default function configureStore(
  initialState = {},
  debug = __DEVELOPMENT__
) {
  const middlewares = debug
    ? applyMiddleware(...envMiddlewares.dev)
    : applyMiddleware(...envMiddlewares.prod)
  const storeEnhancers = debug
    ? compose(
        middlewares,
        autoRehydrate(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    : compose(middlewares, autoRehydrate())

  if (debug) {
    console.warn('DEVELOPMENT: In debug mode') // eslint-disable-line
  }

  const decksCombined = null
  // decksCombined = [...decks, ...samples]; // Comment this out for release
  // decksCombined = [...samples]; // Comment this out for release
  initialState = {
    config,
    decks: decksCombined || []
  }

  const store = createStore(rootReducer, initialState, storeEnhancers)

  // Loads state from local storage
  persistStore(store, {
    blacklist: ['routing', 'form', 'config', 'user']
  })

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux', () => {
      const nextRootReducer = require('./redux/index').rootReducer // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }

  sagaMiddleware.run(rootSaga)

  return store
}
