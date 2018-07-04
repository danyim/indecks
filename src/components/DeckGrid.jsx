import React from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { DeckShape } from './__commonShapes'
import Deck from './Deck'
import Splash from './Splash'
import styles from '../styles/components/DeckGrid.styl'

class DeckGrid extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    decks: PropTypes.arrayOf(DeckShape).isRequired,
    removeDeck: PropTypes.func.isRequired,
    loadSampleDecks: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.handleRemoveDeck = this.handleRemoveDeck.bind(this)
  }

  handleRemoveDeck(deckId) {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      this.props.removeDeck(deckId)
    }
  }

  render() {
    return (
      <TransitionMotion
        willEnter={() => ({ opacity: 0, left: -100 })}
        willLeave={() => ({ opacity: spring(0), left: spring(-100) })}
        styles={this.props.decks.map(d => ({
          key: `deck_${d.id}`,
          data: { deck: d },
          style: {
            opacity: spring(1),
            left: spring(0),
          },
        }))}
      >
        {interpolatedStyles => (
          <section className={`${styles['deck-grid']} wrap-row`}>
            {interpolatedStyles.map(config => (
              <Deck
                key={config.key}
                deck={config.data.deck}
                handleOnClick={() =>
                  this.props.push(`/view/${config.data.deck.id}`)
                }
                push={this.props.push}
                style={{
                  ...config.style,
                  display: 'relative',
                }}
              />
            ))}
            {interpolatedStyles.length === 0 && (
              /*
              <p key="no_value" className="center">
                Click the + button on the top left to add a deck
              </p>
              */
              <Splash loadSampleDecks={this.props.loadSampleDecks} />
            )}
          </section>
        )}
      </TransitionMotion>
    )
  }
}

export default DeckGrid
