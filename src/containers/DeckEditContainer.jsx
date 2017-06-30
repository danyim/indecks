import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as deckActions from '../redux/modules/decks'
import { CardShape, DeckShape } from '../components/__commonShapes'
import DeckEdit from '../components/DeckEdit'

const propTypes = {
  cards: CardShape.isRequired,
  deck: DeckShape.isRequired,
  deckId: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  editDeck: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}
const defaultProps = {}

const DeckEditContainer = props => {
  const { cards, deck, deckId, editCard, removeCard, editDeck, form } = props

  return (
    <DeckEdit
      cards={cards}
      deck={deck}
      deckId={deckId}
      editCard={editCard}
      removeCard={removeCard}
      editDeck={editDeck}
      form={form}
    />
  )
}

DeckEditContainer.propTypes = propTypes
DeckEditContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks, form }, ownProps) => {
  const { deckId } = ownProps.params
  // Find the deck based on the property
  const deckIndex = decks.findIndex(d => d.id === deckId)
  return {
    cards: decks[deckIndex].cards,
    deck: decks[deckIndex],
    deckId,
    form
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditContainer)
