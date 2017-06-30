import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import * as deckActions from '../redux/modules/decks'
import DeckView from '../components/DeckView'

const propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          answer: PropTypes.string.isRequired,
          index: PropTypes.number.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  editDeck: PropTypes.func.isRequired,
  duplicateCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
}
const defaultProps = {}

class DeckViewContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemoveDeck = this.handleRemoveDeck.bind(this)
  }

  handleRemoveDeck(deckId) {
    if (confirm('Are you sure you want to delete this deck?')) {
      this.props.removeDeck(deckId)
      browserHistory.push('/')
    }
  }

  render() {
    const { deckId } = this.props.params
    // Derive the deck index
    const deckIndex = this.props.decks.findIndex(deck => deck.id === deckId)
    // Get the deck
    const deck = this.props.decks[deckIndex]

    if (deck) {
      return (
        <DeckView
          deck={deck}
          handleRemoveDeck={this.handleRemoveDeck}
          handleEditDeck={this.props.editDeck}
          handleDuplicateCard={this.props.duplicateCard}
          handleMoveCard={this.props.moveCard}
          handleRemoveCard={this.props.removeCard}
        />
      )
    } else {
      return <p className="center">Deck not found</p>
    }
  }
}

DeckViewContainer.propTypes = propTypes
DeckViewContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks, config }) => ({ decks, config })
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeckViewContainer)
