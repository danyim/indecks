import React from 'react'
import { Provider } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { configureStore, history } from './store'
import './styles/style.styl'

const initialState = {
  decks: [],
  config: {
    shuffle: false
  },
  user: {
    authenticated: false,
    isAuthenticating: false
  }
}

const store = configureStore(initialState)

class Root extends React.Component {
  componentDidMount() {
    // Call an action here if we need to fetch something as the app loads
    // store.dispatch(getDecks());
  }

  render() {
    const App = withRouter(require('./containers/AppContainer').default) // eslint-disable-line
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
