import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as deckActions from '../redux/modules/decks'
import DeckGrid from '../components/DeckGrid'

const propTypes = {
  decks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired
    }).isRequired).isRequired
  }).isRequired).isRequired
}

const defaultProps = {}

const DeckGridContainer = (props) => {
  if (!Array.isArray(props.decks)) {
    return <span>Error loading decks</span>
  } else {
    return (
      <DeckGrid {...props} />
    )
  }
}

DeckGridContainer.propTypes = propTypes
DeckGridContainer.defaultProps = defaultProps

const mapStateToProps = ({decks}) => ({decks})
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckGridContainer)
