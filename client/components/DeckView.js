import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';

const DeckView = React.createClass({
  render() {
    const { deckId, cardIndex } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the post
    const deck = this.props.decks[i];

    return (
      <div>
        <div className="single-card">
          <Card card={deck.cards[cardIndex - 1]} />
        </div>
        <DeckNavigator deck={deck} cardIndex={parseInt(cardIndex)} mode="view" />
      </div>
    )
  }
});

export default DeckView;
