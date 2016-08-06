import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import { Link, browserHistory } from 'react-router';
import ExportDeckButton from './ExportDeckButton'
import slug from 'slug';

const DeckView = React.createClass({
  // Parses all the cards of a deck object and performs a special replacement
  mdReplacer(k, v) {
    if(k === 'cards') {
      const cards = [...v];
      for(let card of cards) {
        // card.description = 'This is a test';
      }
      return cards;
    }
    return v;
  },
  CardEdit(deckId, i) {
    browserHistory.push(`/edit/${deckId}/${i + 1}`);
  },
  render() {
    const { deckId } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the post
    const deck = this.props.decks[i];
    const mode = 'view';

    // const convertFn = this.convertToJSON.bind(this);

    return (
      <section className="deck-view">
        <div>
          <h1>{deck.title}</h1>
          <p>{deck.description}</p>
          <p>
            <ExportDeckButton
              filename={`${slug(deck.title)}.json`}
              label="Export Deck (JSON)"
              className="button"
              style={{}}
              /*
                // Use this if you want to use the replacer
                exportFile={() =>  JSON.stringify(deck, this.mdReplacer, 2)}
              */
             exportFile={() => JSON.stringify(deck, null, 2)} />
          </p>
        </div>
        <div className="wrap-row">
          {
            deck.cards.map((c, i) =>
              <Card card={c} key={i} handleOnClick={() => this.CardEdit(deckId, i)} />
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
