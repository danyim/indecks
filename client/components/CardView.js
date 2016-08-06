import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';

const CardView = React.createClass({
  render() {
    const { deckId, cardIndex } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the post
    const deck = this.props.decks[i];
    const mode = 'view';

    return (
      <section className="single">
        <div className="single-card">
          <Card card={deck.cards[cardIndex - 1]} />
        </div>

        <DeckNavigator deck={deck} cardIndex={parseInt(cardIndex)} mode={mode} />
      </section>
    )
  }
});

export default CardView;
