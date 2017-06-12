import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as deckActions from '../redux/modules/decks'
import CardEdit from '../components/CardEdit'

const propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }).isRequired,
  cardIndex: PropTypes.number.isRequired,
  deckId: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}
const defaultProps = {}

const CardEditContainer = (props) => {
  const { deckId, cardIndex, card, editCard, removeCard, form } = props

  return (
    <CardEdit
      card={card}
      cardIndex={cardIndex}
      deckId={deckId}
      editCard={editCard}
      removeCard={removeCard}
      form={form}
    />
  )
}

CardEditContainer.propTypes = propTypes
CardEditContainer.defaultProps = defaultProps

const mapStateToProps = ({ decks, form }, ownProps) => {
  const { deckId, cardIndex } = ownProps.params
  // Find the deck based on the property
  const deckIndex = decks.findIndex(d => d.id === deckId)
  return {
    card: decks[deckIndex].cards[cardIndex - 1],
    deckId,
    cardIndex: parseInt(cardIndex, 10),
    form
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardEditContainer)
