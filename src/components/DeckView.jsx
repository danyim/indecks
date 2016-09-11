import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import { Link, browserHistory } from 'react-router';
import ExportDeckButton from './ExportDeckButton';
import slug from 'slug';
import styles from '../styles/components/DeckView';

const propTypes = {};

const defaultProps = {};

class DeckView extends React.Component {
  constructor(props) {
    super(props);
  }

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
  }

  handleOnCardClick(deckId, i) {
    browserHistory.push(`/edit/${deckId}/${i + 1}`);
  }

  render() {
    const emptyMsg = (() => {
      if(this.props.deck.cards.length === 0 ) {
        return <p className="center">Click the + button on the top left to add a card</p>
      }
    })()

    return (
      <section className={`${styles['deck-view']}`}>
        <div className={`${styles['title-card']}`}>
          <div className={`${styles['title-text']}`}>
            <h1>{this.props.deck.title}</h1>
            <p>{this.props.deck.description}</p>
            <p><strong>{`${this.props.deck.cards.length} cards in this deck`}</strong></p>
          </div>
          <div className={`${styles['control-buttons']}`}>
            <Link className="button" to={`/view/${this.props.deck.id}/1`}>
              <span>
                Play Deck
              </span>
            </Link>
            <Link className="button" to={`/edit/${this.props.deck.id}`}>
              <span>
                Edit Details
              </span>
            </Link>
            <ExportDeckButton
              filename={`${slug(this.props.deck.title)}.json`}
              label="Export Deck"
              className="button"
              style={{}}
              /*
                // Use this if you want to use the replacer
                exportFile={() =>  JSON.stringify(deck, this.mdReplacer, 2)}
              */
             exportFile={() => JSON.stringify(this.props.deck, null, 2)} />
            <a className="button btn-delete" onClick={() => this.props.handleRemoveDeck(this.props.deck.id)}>
                Delete Deck
            </a>
          </div>
        </div>

        <div className={`wrap-row ${styles['grid']}`}>
          {
            this.props.deck.cards.map((c, i) =>
              <Card card={c} key={i} handleOnClick={() => this.handleOnCardClick(this.props.deck.id, i)} />
            )
          }
          {emptyMsg}
        </div>
      </section>
    )
  }
}

DeckView.propTypes = propTypes;
DeckView.defaultProps = defaultProps;

export default DeckView;
