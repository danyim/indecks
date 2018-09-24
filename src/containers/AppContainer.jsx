import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'
import { push } from 'connected-react-router'
import * as configActions from '../redux/modules/config'
import * as userActions from '../redux/modules/user'
import * as deckActions from '../redux/modules/decks'
import App from '../components/App'

import DeckGridContainer from './DeckGridContainer'
import DeckAddContainer from './DeckAddContainer'
import DeckViewContainer from './DeckViewContainer'
import CardEditContainer from './CardEditContainer'
import CardViewContainer from './CardViewContainer'

// TODO: Add in the rest of the routes as Route components from routes.jsx
const AppContainer = props => (
  <App {...props}>
    <Switch>
      <Route path="/" exact component={DeckGridContainer} />
      <Route path="/add/:deckId" exact component={DeckAddContainer} />
      <Route path="/view/:deckId" exact component={DeckViewContainer} />
      <Route path="/edit/:deckId/:cardIndex" exact component={CardEditContainer} />
      <Route path="/view/:deckId/:cardIndex" exact component={CardViewContainer} />
    </Switch>
  </App>
)

const mapStateToProps = ({ user, config }) => ({
  ...user,
  currentModal: config.currentModal,
})

const mapDispatchToProps = dispatch => {
  userActions.setupAuthHook(dispatch)

  return bindActionCreators(
    Object.assign({ push }, configActions, deckActions, userActions),
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
