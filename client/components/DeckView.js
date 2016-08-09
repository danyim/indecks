import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import { Link, browserHistory } from 'react-router';
import ExportDeckButton from './ExportDeckButton'
import slug from 'slug';
import styles from '../styles/components/DeckView';

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

  handleEditCard(deckId, i) {
    browserHistory.push(`/edit/${deckId}/${i + 1}`);
  },

  handleRemoveDeck(deckId) {
    if(confirm('Are you sure you want to delete this deck?')) {
      this.props.removeDeck(deckId);
      browserHistory.push(`/`);
    }
  },

  render() {
    const { deckId } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the post
    const deck = this.props.decks[i];
    const mode = 'view';

    const emptyMsg = (() => {
      if(deck.cards.length === 0 ) {
        return <p>Click the + button on the top left to add a card</p>
      }
    })()

    return (
      <section className={`${styles['deck-view']}`}>
        <div className={`${styles['title-card']}`}>
          <div className={`${styles['title-text']}`}>
            <h1>{deck.title}</h1>
            <p>{deck.description}</p>
          </div>
          <div className={`${styles['control-buttons']}`}>
            <Link className="button" to={`/view/${deck.id}/1`}>
              <span className={`${styles['comment-count']}`}>
                Play Deck
              </span>
            </Link>
            <Link className="button" to={`/view/${deck.id}/1`}>
              <span className={`${styles['comment-count']}`}>
                Edit Details
              </span>
            </Link>
            {/*<Link className="button" to={`/edit/${deck.id}/1`}>
              <span className={`${styles['comment-count']}`}>
                Edit
              </span>
            </Link>*/}
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
            <a className="button btn-delete" onClick={() => this.handleRemoveDeck(deck.id)}>
                Delete Deck
            </a>
          </div>
        </div>

        <div className={`wrap-row ${styles['grid']}`}>
          {
            deck.cards.map((c, i) =>
              <Card card={c} key={i} handleOnClick={() => this.handleEditCard(deckId, i)} />
            )
          }
          {emptyMsg}
        </div>
      </section>
    )
  }
});

export default DeckView;
