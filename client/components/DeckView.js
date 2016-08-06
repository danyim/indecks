import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import { Link, browserHistory } from 'react-router';

const DeckView = React.createClass({
  editCard(deckId, i) {
    browserHistory.push(`/edit/${deckId}/${i + 1}`);
  },
  render() {
    const { deckId } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the post
    const deck = this.props.decks[i];
    const mode = 'view';

    return (
      <section className="deck-view">
        <div>
          <h1>{deck.title}</h1>
          <p>{deck.description}</p>
        </div>
        <div className="wrap-row">
          {
            deck.cards.map((c, i) =>
              <Card card={c} key={i} handleOnClick={() => this.editCard(deckId, i)} />
            )
          }
        </div>
        <div className="deck-navigator">
          <div className="deck-nav-links">
            <Link to={`/`}>Back to decks</Link>
          </div>
        </div>
      </section>
    )
  }
});

export default DeckView;
