import React from 'react';
import Deck from './Deck';
import styles from '../styles/components/DeckGrid';

const DeckGrid = React.createClass({
  render() {
    return (
      <section className={`${styles['deck-grid']} wrap-row`}>
        {this.props.decks.map((deck, i) =>
          <Deck {...this.props} key={i} i={i} deck={deck} />
        )}
      </section>
    )
  }
});

export default DeckGrid;
