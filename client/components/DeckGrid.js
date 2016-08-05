import React from 'react';
import Deck from './Deck';
import AddDeck from './AddDeck';

const DeckGrid = React.createClass({
  render() {
    return (
      <div className="deck-grid">
        <AddDeck />
        {this.props.decks.map((deck, i) =>
          <Deck {...this.props} key={i} i={i} deck={deck} />
        )}
      </div>
    )
  }
});

export default DeckGrid;
