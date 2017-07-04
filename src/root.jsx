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
  }
}

const store = configureStore(initialState)

const renderApp = () => {
  const App = withRouter(require('./containers/AppContainer').default)
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    mountNode
  )
}

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp()
    } catch (error) {
      const RedBox = require('redbox-react').default

      render(<RedBox error={error} />, mountNode)
    }
  }

  module.hot.accept('./containers/AppContainer', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode)
      reRenderApp()
    })
  })
}

renderApp()

// class Root extends React.Component {
//   componentDidMount() {
//     // Call an action here if we need to fetch something as the app loads
//     // store.dispatch(getDecks());
//   }

//   render() {
//     const App = withRouter(require('./containers/AppContainer').default) // eslint-disable-line
//     return (
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <App />
//         </ConnectedRouter>
//       </Provider>
//     )
//   }
// }

// export default Root
