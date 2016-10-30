import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../action-creators/deck';
import { Link, browserHistory } from 'react-router';
import DeckView from '../components/DeckView';

const propTypes = {
  decks: React.PropTypes.array.isRequired,
  editDeck: React.PropTypes.func.isRequired
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
      browserHistory.push(`/`);
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
const mapDispatchToProps = (dispatch) => bindActionCreators(deckActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckViewContainer);

