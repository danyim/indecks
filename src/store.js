import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import thunk from 'redux-thunk'
import axios from 'axios'
import createHistory from 'history/createBrowserHistory'
import { rootReducer } from './redux/index'

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const history = createHistory()

/**
 * Applies reducers, middleware, and enhancers to the store
 * @param  {Object} initialState Initial state when the app loads
 * @param  {Boolean} debug       Flag for debug mode
 * @return {Object}              A store object for Redux
 */
export function configureStore(initialState = {}, debug = IS_DEVELOPMENT) {
  const envMiddlewares = {
    dev: [thunk.withExtraArgument(axios), routerMiddleware(history)],
    prod: [thunk.withExtraArgument(axios), routerMiddleware(history)],
  }

  const storeEnhancers = debug
    ? compose(
        applyMiddleware(...envMiddlewares.dev),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
      )
    : compose(applyMiddleware(...envMiddlewares.prod))

  const store = createStore(connectRouter(history)(rootReducer), initialState, storeEnhancers)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux', () => {
      const nextRootReducer = require('./redux/index').rootReducer // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default { configureStore, history }
