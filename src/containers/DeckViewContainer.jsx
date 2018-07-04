import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import * as deckActions from '../redux/modules/decks'
import { DeckShape } from '../components/__commonShapes'
import DeckView from '../components/DeckView'

const propTypes = {
  decks: PropTypes.arrayOf(DeckShape.isRequired).isRequired,
  editDeck: PropTypes.func.isRequired,
  duplicateCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
}
const defaultProps = {}

class DeckViewContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemoveDeck = this.handleRemoveDeck.bind(this)
  }

  handleRemoveDeck(deckId) {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      this.props.removeDeck(deckId)
      this.props.push('/')
    }
  }

  render() {
    const { deckId } = this.props.match.params
    // Derive the deck index
    const deckIndex = this.props.decks.findIndex(deck => deck.id === deckId)
    // Get the deck
    const deck = this.props.decks[deckIndex]

    if (deck) {
      return (
        <DeckView
          {...this.props}
          deck={deck}
          handleRemoveDeck={this.handleRemoveDeck}
          handleEditDeck={this.props.editDeck}
          handleDuplicateCard={this.props.duplicateCard}
          handleMoveCard={this.props.moveCard}
          handleRemoveCard={this.props.removeCard}
        />
      )
    }
    return <p className="center">Deck not found</p>
  }
}

DeckViewContainer.propTypes = propTypes
DeckViewContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks, config }) => ({ decks, config })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...deckActions, push }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckViewContainer)
