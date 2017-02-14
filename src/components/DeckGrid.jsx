import React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import Deck from './Deck';
import styles from '../styles/components/DeckGrid';

const propTypes = {
  decks: React.PropTypes.array.isRequired,
  removeDeck: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class DeckGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveDeck = this.handleRemoveDeck.bind(this);
  }

  handleRemoveDeck(deckId) {
    if (confirm('Are you sure you want to delete this deck?')) {
      this.props.removeDeck(deckId);
    }
  }

  render() {
    return (
      <TransitionMotion
        willEnter={() => ({ opacity: 0, left: -100})}
        willLeave={() => ({ opacity: spring(0), left: spring(-100)})}
        styles={this.props.decks.map(d => ({
          key: `deck_${d.id}`,
          data: { deck: d },
          style: {
            opacity: spring(1),
            left: spring(0)
          }
        }))}
      >
        {
          interpolatedStyles =>
            <section className={`${styles['deck-grid']} wrap-row`}>
              {
                interpolatedStyles.map((config) => {
                  return (
                    <Deck
                      key={config.key}
                      deck={config.data.deck}
                      style={{
                        ...config.style,
                        display: 'relative'
                      }}
                    />
                  );
                })
              }
              { this.props.decks.length === 0 &&
                <p key="no_value" className="center">Click the + button on the top left to add a deck</p>
              }
            </section>
        }
      </TransitionMotion>
    );
  }
}

DeckGrid.propTypes = propTypes;
DeckGrid.defaultProps = defaultProps;

export default DeckGrid;
