import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as deckActions from '../redux/modules/decks'
import { CardShape } from '../components/__commonShapes'
import CardEdit from '../components/CardEdit'

const propTypes = {
  card: CardShape.isRequired,
  cardIndex: PropTypes.number.isRequired,
  deckId: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}
const defaultProps = {}

const CardEditContainer = props => {
  const { deckId, cardIndex, card, editCard, removeCard, form } = props

  return (
    <CardEdit
      card={card}
      cardIndex={cardIndex}
      deckId={deckId}
      editCard={editCard}
      removeCard={removeCard}
      form={form}
      push={props.push}
    />
  )
}

CardEditContainer.propTypes = propTypes
CardEditContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks, form }, ownProps) => {
  const { deckId, cardIndex } = ownProps.match.params
  // Find the deck based on the property
  const deckIndex = decks.findIndex(d => d.id === deckId)
  return {
    card: decks[deckIndex].cards[cardIndex - 1],
    deckId,
    cardIndex: parseInt(cardIndex, 10),
    form,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...deckActions, push }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardEditContainer)
