import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../redux/modules/user'
import * as deckActions from '../redux/modules/decks'
import App from '../components/App'

const AppContainer = props => (
  <App
    {...props}
  />
)

const mapStateToProps = ({ user }) => ({
  ...user
})

const mapDispatchToProps = (dispatch) => {
  userActions.setupAuthHook(dispatch)

  return bindActionCreators(
    Object.assign({}, deckActions, userActions),
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
