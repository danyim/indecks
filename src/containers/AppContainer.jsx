import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import * as configActions from '../redux/modules/config'
import * as userActions from '../redux/modules/user'
import * as deckActions from '../redux/modules/decks'
import App from '../components/App'
import routes from '../routes'
import { routeWithSubRoutes } from '../utils'

const AppContainer = props =>
  <App {...props}>
    <Switch>
      {routes.map(route => routeWithSubRoutes(route))}
    </Switch>
  </App>

const mapStateToProps = ({ user, config }) => ({
  ...user,
  currentModal: config.currentModal
})

const mapDispatchToProps = dispatch => {
  userActions.setupAuthHook(dispatch)

  return bindActionCreators(
    Object.assign({ push }, configActions, deckActions, userActions),
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
