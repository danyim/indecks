import React from 'react';
import EditCard from './EditCard';
import DeckNavigator from './DeckNavigator';

const DeckEdit = React.createClass({
  render() {
    const { deckId, cardIndex } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the deck
    const deck = this.props.decks[i];
    const mode = 'edit';

    return (
      <section className="single">
        <div className="single-card">
          <EditCard card={deck.cards[cardIndex - 1]} cardIndex={cardIndex} deckId={deck.id} {...this.props} />
        </div>
        <DeckNavigator deck={deck} cardIndex={parseInt(cardIndex)} mode={mode} />
      </section>
    )
  }
});

export default DeckEdit;
