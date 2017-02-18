import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../redux/modules/decks';
import * as configActions from '../redux/modules/config';
import CardView from '../components/CardView';

const propTypes = {
  card: React.PropTypes.object,
  deck: React.PropTypes.object
};

const defaultProps = {
  card: null,
  deck: null
};

const CardViewContainer = (props) => {
  const { card, deck } = props;
  if(deck === null) {
    return (
      <p className="center">
        Invalid deck
      </p>
    );
  }
  if (deck.cards.length === 0) {
    return (
      <p className="center">
        No cards have been added to this deck. Click the + on the top left to
        add a card.
      </p>
    );
  }
  if (!card) {
    return (
      <p className="center">
        Invalid card index
      </p>
    );
  }

  return (
    <CardView {...props} />
  );
};

CardViewContainer.propTypes = propTypes;
CardViewContainer.defaultProps = defaultProps;

const mapStateToProps = ({ decks, config }, ownProps) => {
  const { deckId, cardIndex } = ownProps.params;
  // Find the deck based on the property
  const deckIndex = deckId ? decks.findIndex(d => d.id === deckId) : null;
  let card, deck;
  if(deckId === undefined && cardIndex === undefined) {
    card = null;
    deck = null;
  }
  else {
    deck = decks[deckIndex]

    if(deck !== undefined && decks[deckIndex].cards.length > 0) {
      card = decks[deckIndex].cards[cardIndex - 1];
    }
    else {
      card = null;
    }
  }
  return {
    card,
    deck,
    config,
    cardIndex: parseInt(cardIndex, 10)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, deckActions, configActions), dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardViewContainer);
