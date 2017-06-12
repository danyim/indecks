import React from 'react'
import styles from '../styles/components/DeckSelector.styl'

const propTypes = {
  // decks: React.PropTypes.array.isRequired,
  // excludedDeckIds: React.PropTypes.array,
  // maxSelected: React.PropTypes.number.isRequired,
  // minSelected: React.PropTypes.number.isRequired,
  // handleOnSelected: React.PropTypes.func.isRequired
}

const defaultProps = {
  maxSelected: 1,
  minSelected: 1
}

/**
 * Should be a simple pop-up of all the decks available to choose from,
 * optionally excluding (or greying out) a particular deck from the list.
 *
 * Input: decks to choose from, deck to exclude from selection, number of decks
 *   to allow for selection via [min, max]
 * Output: deck(s) selected from the list
 */
const DeckSelector = () => {
  const { decks } = this.props

  return (
    <div>
      <p>Yo, motherfucker, here are your decks:</p>
      {decks.map(x =>
        <div className={`${styles['deck-list-item']}`}>
          deck Id: {x.deckId}
        </div>
      )}
    </div>
  )
}

DeckSelector.propTypes = propTypes
DeckSelector.defaultProps = defaultProps

export default DeckSelector
