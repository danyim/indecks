import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { DeckShape } from './__commonShapes'
import styles from '../styles/components/DeckSelector.styl'

/**
 * Should be a simple pop-up of all the decks available to choose from,
 * optionally excluding (or greying out) a particular deck from the list.
 *
 * Input: decks to choose from, deck to exclude from selection, number of decks
 *   to allow for selection via [min, max]
 * Output: deck(s) selected from the list
 */
class DeckSelector extends React.Component {
  static propTypes = {
    decks: PropTypes.arrayOf(DeckShape.isRequired).isRequired,
    // excludedDeckIds: React.PropTypes.array,
    // maxSelected: React.PropTypes.number.isRequired,
    // minSelected: React.PropTypes.number.isRequired,
    handleOnSelected: PropTypes.func
  }

  static defaultProps = {
    // maxSelected: 1,
    // minSelected: 1,
    handleOnSelected: () => {}
  }

  static navigateToDeck(deckId) {
    browserHistory.push(`/view/${deckId}`)
  }

  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveUp = this.moveUp.bind(this)

    // Grab the currently viewed deck (if applicable) and pre-select it
    let index = null
    if (
      window &&
      window.location.pathname &&
      window.location.pathname.includes('/view/')
    ) {
      const deckId = window.location.pathname.split('/')[2]
      index = this.props.decks.findIndex(x => x.id === deckId)
    }

    this.state = {
      selectedIndex: index || 0
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 38) {
      // Up arrow
      this.moveUp()
    } else if (e.keyCode === 40) {
      // Down arrow
      this.moveDown()
    } else if (e.keyCode === 13) {
      // Enter key
      DeckSelector.navigateToDeck(this.props.decks[this.state.selectedIndex].id)
      this.props.handleOnSelected()
    }
  }

  moveDown() {
    this.setState({
      selectedIndex: Math.min(
        this.props.decks.length - 1,
        this.state.selectedIndex + 1
      )
    })
  }

  moveUp() {
    this.setState({
      selectedIndex: Math.max(0, this.state.selectedIndex - 1)
    })
  }

  render() {
    const { decks } = this.props

    return (
      <div>
        <ul
          ref={input => input && input.focus()}
          tabIndex={-1}
          className={styles['deck-list']}
          onKeyDown={this.handleKeyDown}
          role="presentation"
        >
          {decks.map((deck, index) =>
            <li
              key={deck.id}
              value={deck.id}
              className={index === this.state.selectedIndex ? 'selected' : ''}
            >
              {deck.title} <small>{deck.cards.length} cards</small>
            </li>
          )}
          {/*
          <button onClick={this.moveUp}>Up</button>
          <button onClick={this.moveDown}>Down</button>
          */}
        </ul>
        <p className={styles.help}>
          Use the up and down arrows to select a deck. Press enter to navigate
          to the deck.
        </p>
      </div>
    )
  }
}

export default DeckSelector
