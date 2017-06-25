import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../redux/modules/user'
import Auth from '../components/Auth'

const AuthContainer = props => (
  <Auth
    {...props}
  />
)

const mapStateToProps = ({ user }) => ({
  ...user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    userActions,
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer)
