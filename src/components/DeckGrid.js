import React from 'react';
import Deck from './Deck';
import styles from '../styles/components/DeckGrid';

class DeckGrid extends React.Component {
  render() {
    const emptyMsg =
      this.props.decks.length === 0 ?
        <p>Click the + button on the top left to add a deck</p>
        : '';

    return (
      <section className={`${styles['deck-grid']} wrap-row`}>
        {this.props.decks.map((deck, i) =>
          <Deck {...this.props} key={i} i={i} deck={deck} />
        )}
        {emptyMsg}
      </section>
    )
  }
}

DeckGrid.propTypes = {};
DeckGrid.defaultProps = {};

export default DeckGrid;
