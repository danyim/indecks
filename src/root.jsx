/* @flow */
import React from 'react'
import { Provider } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { configureStore, history } from './store'
import './styles/style.styl'

// TODO: Move the initial state to the ducks
const initialState = {
  decks: [],
  config: {
    shuffle: false,
  },
  user: {
    authenticated: false,
    isAuthenticating: false,
  },
}

const store = configureStore(initialState)

const App = withRouter(require('./containers/AppContainer').default) // eslint-disable-line
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

export default Root
