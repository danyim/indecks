import React from 'react';
import { Link, browserHistory } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Deck = React.createClass({
  navigateToDeck(deckId) {
    browserHistory.push(`/view/${deckId}/1`);
  },

  render() {
    const { deck, i } = this.props;
    const post = {};

    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <h1 className="deck-title" onClick={() => this.navigateToDeck(deck.id)}>{deck.title}</h1>
        </div>

        <figcaption>
          <p><code>{deck.id}</code></p>
          <p>URL: <a href={deck.url}>Link</a></p>
          <p>{deck.cards.length} cards</p>
          <div className="control-buttons">
            <Link className="button" to={`/edit/${deck.id}/1`}>
              <span className="comment-count">
                Edit Deck
              </span>
            </Link>
            <a className="button button-delete" onClick={() => this.props.removeDeck(deck.id)}>
                Delete Deck
            </a>
          </div>
        </figcaption>
      </figure>
    );
  }
})

export default Deck;
