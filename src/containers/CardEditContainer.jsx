import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import CardEdit from '../components/CardEdit';

const propTypes = {
  card: React.PropTypes.object.isRequired,
  cardIndex: React.PropTypes.number.isRequired,
  deckId: React.PropTypes.string.isRequired,
  editCard: React.PropTypes.func.isRequired,
  removeCard: React.PropTypes.func.isRequired,
  form: React.PropTypes.object.isRequired,
};
const defaultProps = {};

const CardEditContainer = (props) => {
  const { deckId, cardIndex, card, editCard, removeCard, form } = props;

  return (
    <CardEdit
      card={card}
      cardIndex={cardIndex}
      deckId={deckId}
      editCard={editCard}
      removeCard={removeCard}
      form={form}
    />
  );
};

CardEditContainer.propTypes = propTypes;
CardEditContainer.defaultProps = defaultProps;

const mapStateToProps = ({ decks, form }, ownProps) => {
  const { deckId, cardIndex } = ownProps.params;
  // Find the deck based on the property
  const deckIndex = decks.findIndex(d => d.id === deckId);
  return {
    card: decks[deckIndex].cards[cardIndex - 1],
    deckId,
    cardIndex: parseInt(cardIndex, 10),
    form
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardEditContainer);
