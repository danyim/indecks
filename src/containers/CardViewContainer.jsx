import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import * as configActions from '../action-creators/config';
import CardView from '../components/CardView';
import styles from '../styles/components/CardView';

const propTypes = {
  card: React.PropTypes.object.isRequired,
  deck: React.PropTypes.object.isRequired
};

const defaultProps = {};

const CardViewContainer = (props) => {
  const { card, deck } = props;
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
    <CardView {...this.props} />
  );
};

CardViewContainer.propTypes = propTypes;
CardViewContainer.defaultProps = defaultProps;

const mapStateToProps = ({ decks, config }, ownProps) => {
  const { deckId, cardIndex } = ownProps.params;
  // Find the deck based on the property
  const deckIndex = decks.findIndex(d => d.id === deckId);
  return {
    card: decks[deckIndex].cards.length > 0 ? decks[deckIndex].cards[cardIndex - 1] : null,
    deck: decks[deckIndex],
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
