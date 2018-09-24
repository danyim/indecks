import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../redux/modules/user'
import * as deckActions from '../redux/modules/decks'
import Settings from '../components/Settings'

const propTypes = {
  deckCount: PropTypes.number.isRequired,
  removeAllDecks: PropTypes.func.isRequired,
}

const defaultProps = {}

const SettingsContainer = props => (
  <Settings deckCount={props.deckCount} removeAllDecks={props.removeAllDecks} {...props} />
)

SettingsContainer.propTypes = propTypes
SettingsContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks }) => ({
  decks,
  deckCount: decks.length,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, deckActions, userActions), dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer)
