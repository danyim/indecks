import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import * as deckActions from '../redux/modules/decks'
import { DeckShape } from '../components/__commonShapes'
import DeckGrid from '../components/DeckGrid'

const propTypes = {
  decks: PropTypes.arrayOf(DeckShape.isRequired).isRequired,
}

const defaultProps = {}

const DeckGridContainer = props => {
  if (!Array.isArray(props.decks)) {
    return <span>Error loading decks</span>
  }
  return <DeckGrid {...props} />
}

DeckGridContainer.propTypes = propTypes
DeckGridContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks }) => ({ decks })
const mapDispatchToProps = dispatch => bindActionCreators({ ...deckActions, push }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckGridContainer)
