import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/Deck';

const propTypes = {
  deck: React.PropTypes.object.isRequired
};

const defaultProps = {};

class Deck extends React.Component {
  navigateToDeck(deckId) {
    browserHistory.push(`/view/${deckId}`);
  }

  render() {
    const { deck } = this.props;
    const { id: deckId } = deck;

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`}>
        <div>
          <h1
            className={`${styles['deck-title']}`}
          >
            <a onClick={() => this.navigateToDeck(deckId)}>
              {deck.title}
            </a>
          </h1>
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
          <Link className="button" to={`/view/${deckId}/1`}>
            Play Deck
          </Link>
          {/*
          <a className="button btn-delete" onClick={() => this.props.handleRemoveDeck(deckId)}>
              Delete
          </a>
          */}
        </div>
      </figure>
    );
  }
}

Deck.propTypes = propTypes;
Deck.defaultProps = defaultProps;

export default Deck;
