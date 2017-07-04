/* globals __DEVELOPMENT__ */
import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
// import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import axios from 'axios'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// import rootSaga from './sagas/index'
import { combineListeners } from './listenerMiddleware'
import { rootReducer, /* rootSaga, */ rootListener } from './redux/index'

const history = createHistory()
const logger = createLogger()

// const sagaMiddleware = createSagaMiddleware()
const listenerMiddlewares = combineListeners(rootListener)
const envMiddlewares = {
  dev: [
    logger,
    thunk.withExtraArgument(axios),
    // sagaMiddleware,
    routerMiddleware(history),
    ...listenerMiddlewares
  ],
  prod: [
    thunk.withExtraArgument(axios),
    // sagaMiddleware,
    routerMiddleware(history),
    ...listenerMiddlewares
  ]
}

/**
 * Applies reducers, middleware, and enhancers to the store
 * @param  {Object} initialState Initial state when the app loads
 * @param  {Boolean} debug       Flag for debug mode
 * @return {Object}              A store object for Redux
 */
function configureStore(initialState = {}, debug = __DEVELOPMENT__) {
  const storeEnhancers = debug
    ? compose(
        applyMiddleware(...envMiddlewares.dev),
        autoRehydrate(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    : compose(applyMiddleware(...envMiddlewares.prod), autoRehydrate())

  if (debug) {
    console.warn('DEVELOPMENT: In debug mode') // eslint-disable-line
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

  // sagaMiddleware.run(rootSaga)

  return store
}

export { configureStore, history }
