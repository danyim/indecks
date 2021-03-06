import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as deckActions from '../redux/modules/decks'
import * as configActions from '../redux/modules/config'
import { CardShape, DeckShape } from '../components/__commonShapes'
import CardView from '../components/CardView'

const propTypes = {
  card: CardShape,
  deck: DeckShape,
}

const defaultProps = {
  card: null,
  deck: null,
}

const CardViewContainer = props => {
  const { card, deck } = props
  if (!deck) {
    return <p className="center">Deck not found.</p>
  }
  if (!deck.cards || deck.cards.length === 0) {
    return (
      <p className="center m-t">
        No cards have been added to this deck. Click the <i className="fa fa-plus-square-o" /> on
        the top left to add a card.
      </p>
    )
  }
  if (!card) {
    return <p className="center">Invalid card index.</p>
  }

  return <CardView {...props} />
}

CardViewContainer.propTypes = propTypes
CardViewContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks, config }, ownProps) => {
  const { deckId, cardIndex } = ownProps.match.params
  // Find the deck based on the property
  const deckIndex = deckId ? decks.findIndex(d => d.id === deckId) : null
  let card
  let deck
  if (deckId === undefined && cardIndex === undefined) {
    card = null
    deck = null
  } else {
    deck = decks[deckIndex]

    if (deck !== undefined && decks[deckIndex].cards.length > 0) {
      card = decks[deckIndex].cards[cardIndex - 1]
    } else {
      card = null
    }
  }
  return {
    card,
    deck,
    config,
    cardIndex: parseInt(cardIndex, 10),
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({ push }, deckActions, configActions), dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardViewContainer)
