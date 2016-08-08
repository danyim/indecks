import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/Deck';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Deck = React.createClass({
  navigateToDeck(deckId) {
    browserHistory.push(`/view/${deckId}`);
  },

  render() {
    const { deck, i } = this.props;
    const post = {};

    return (
      <figure className="grid-figure">
        <div className="">
          <h1 className={`${styles['deck-title']}`} onClick={() => this.navigateToDeck(deck.id)}>{deck.title}</h1>
        </div>

        <figcaption>
          {/*
          <p><code>{deck.id}</code></p>
          <p>URL: <a href={deck.url}>Link</a></p>
          */}
          <p className={`${styles['card-count']}`}>{deck.cards.length} cards</p>
          <p>{deck.description}</p>
          <div className="control-buttons">
            <Link className="button" to={`/view/${deck.id}/1`}>
              <span className="comment-count">
                View
              </span>
            </Link>
            <Link className="button" to={`/edit/${deck.id}/1`}>
              <span className="comment-count">
                Edit
              </span>
            </Link>
            <a className="button button-delete" onClick={() => this.props.removeDeck(deck.id)}>
                Delete
            </a>
          </div>
        </figcaption>
      </figure>
    );
  }
})

export default Deck;
