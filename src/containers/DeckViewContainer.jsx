import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as deckActions from '../action-creators/deck';
import DeckView from '../components/DeckView';

const propTypes = {
  decks: React.PropTypes.array.isRequired,
  editDeck: React.PropTypes.func.isRequired,
  duplicateCard: React.PropTypes.func.isRequired,
  moveCard: React.PropTypes.func.isRequired,
  removeCard: React.PropTypes.func.isRequired,
  removeDeck: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired
};
const defaultProps = {};

class DeckViewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveDeck = this.handleRemoveDeck.bind(this);
  }

  handleRemoveDeck(deckId) {
    if(confirm('Are you sure you want to delete this deck?')) {
      this.props.removeDeck(deckId);
      browserHistory.push('/');
    }
  }

  render() {
    const { deckId } = this.props.params;
    // Derive the deck index
    const deckIndex = this.props.decks.findIndex(deck => deck.id === deckId);
    // Get the deck
    const deck = this.props.decks[deckIndex];

    if(deck) {
      return (
        <DeckView
          deck={deck}
          handleRemoveDeck={this.handleRemoveDeck}
          handleEditDeck={this.props.editDeck}
          handleDuplicateCard={this.props.duplicateCard}
          handleMoveCard={this.props.moveCard}
          handleRemoveCard={this.props.removeCard}
        />
      );
    }
    else {
      return (
        <span>Deck not found</span>
      );
    }
  }
}

DeckViewContainer.propTypes = propTypes;
DeckViewContainer.defaultProps = defaultProps;

const mapStateToProps = ({decks, config}) => ({decks, config});
const mapDispatchToProps = dispatch => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckViewContainer);

