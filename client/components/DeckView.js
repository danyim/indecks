import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import { Link } from 'react-router';

const DeckView = React.createClass({
  render() {
    const { deckId } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the post
    const deck = this.props.decks[i];
    const mode = 'view';

    return (
      <div>
        <h2>{deck.title}</h2>
        <div className="deck-grid">
          {deck.cards.map((c, i) => <Card card={c} key={i} />)}
        </div>
        <div className="deck-navigator">
          <div className="deck-nav-links">
            <Link to={`/`}>Back to decks</Link>
          </div>
        </div>
      </div>
    )
  }
});

export default DeckView;
