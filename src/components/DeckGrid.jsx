import React from 'react';
import Deck from './Deck';
import styles from '../styles/components/DeckGrid';

const propTypes = {
  decks: React.PropTypes.array.isRequired,
  removeDeck: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class DeckGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveDeck = this.handleRemoveDeck.bind(this);
  }

  handleRemoveDeck(deckId) {
    if (confirm('Are you sure you want to delete this deck?')) {
      this.props.removeDeck(deckId);
    }
  }

  render() {
    const emptyMsg =
      this.props.decks.length === 0 ?
        <p className="center">Click the + button on the top left to add a deck</p>
        : '';

    return (
      <section className={`${styles['deck-grid']} wrap-row`}>
        {this.props.decks.map((deck, i) =>
          <Deck key={i} i={i} deck={deck} handleRemoveDeck={this.handleRemoveDeck} />
        )}
        {emptyMsg}
      </section>
    );
  }
}

DeckGrid.propTypes = propTypes;
DeckGrid.defaultProps = defaultProps;

export default DeckGrid;
