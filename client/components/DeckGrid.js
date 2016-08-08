import React from 'react';
import Deck from './Deck';
import styles from '../styles/components/DeckGrid';

const DeckGrid = React.createClass({
  render() {
    const emptyMsg = (() => {
      if(this.props.decks.length === 0 ) {
        return <p>Click the + button on the top left to add a deck</p>
      }
    })()

    return (
      <section className={`${styles['deck-grid']} wrap-row`}>
        {this.props.decks.map((deck, i) =>
          <Deck {...this.props} key={i} i={i} deck={deck} />
        )}
        {emptyMsg}
      </section>
    )
  }
});

export default DeckGrid;
