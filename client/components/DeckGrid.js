import React from 'react';
import Deck from './Deck';
import AddDeck from './AddDeck';

const DeckGrid = React.createClass({
  render() {
    return (
      <section className="deck-grid wrap-row">
        <AddDeck />
        {this.props.decks.map((deck, i) =>
          <Deck {...this.props} key={i} i={i} deck={deck} />
        )}
      </section>
    )
  }
});

export default DeckGrid;
