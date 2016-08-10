import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/Deck';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Deck extends React.Component {
  handleRemoveDeck(deckId, removeFn) {
    if(confirm('Are you sure you want to delete this deck?')) {
      removeFn(deckId);
    }
  }

  navigateToDeck(deckId) {
    browserHistory.push(`/view/${deckId}`);
  }

  render() {
    const { deck, i } = this.props;
    const post = {};

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`}>
        <div>
          <h1 className={`${styles['deck-title']}`} onClick={() => this.navigateToDeck(deck.id)}>{deck.title}</h1>
        </div>

        <figcaption>
          {/*
          <p><code>{deck.id}</code></p>
          <p>URL: <a href={deck.url}>Link</a></p>
          */}
          <p>{deck.cards.length} cards</p>
          <p>{deck.description}</p>
        </figcaption>

        <div className={`control-buttons ${styles['control-buttons']}`}>
          <Link className="button" to={`/view/${deck.id}/1`}>
            <span className="comment-count">
              View
            </span>
          </Link>
          {/*<Link className="button" to={`/edit/${deck.id}/1`}>
            <span className="comment-count">
              Edit
            </span>
          </Link>*/}
          <a className="button btn-delete" onClick={() => this.handleRemoveDeck(deck.id, this.props.removeDeck)}>
              Delete
          </a>
        </div>
      </figure>
    );
  }
}

export default Deck;
