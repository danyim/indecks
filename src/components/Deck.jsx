import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/Deck.styl';

const propTypes = {
  deck: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      answer: React.PropTypes.string.isRequired,
      index: React.PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
  style: React.PropTypes.object,
  children: React.PropTypes.node
};

const defaultProps = {
  style: {},
  children: null
};

class Deck extends React.Component {
  navigateToDeck(deckId) {
    browserHistory.push(`/view/${deckId}`);
  }

  render() {
    const { deck, style } = this.props;
    const { id: deckId } = deck;

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`} style={style}>
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
        {this.props.children}
      </figure>
    );
  }
}

Deck.propTypes = propTypes;
Deck.defaultProps = defaultProps;

export default Deck;
