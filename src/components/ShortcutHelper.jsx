import React from 'react'
import styles from '../styles/components/ShortcutHelper.styl'

const propTypes = {}
const defaultProps = {}

const ShortcutHelper = () =>
  <section className={`${styles['shortcut-helper']}`}>
    <h2 className={`${styles.header}`}>Keyboard Shortcuts</h2>
    <div className={`${styles['shortcut-helper-content']}`}>
      <h4>Global</h4>
      <p>
        <kbd>I</kbd> - Add/Import Deck
      </p>
      <p>
        <kbd>S</kbd> - Deck Quick Selector
      </p>
      <p>
        <kbd>,</kbd> - Settings
      </p>
      <p>
        <kbd>/</kbd> - Keyboard Shortcuts
      </p>

      <h4>While viewing a deck</h4>
      <p>
        <kbd>H</kbd> - Toggle shuffle
      </p>
      <p>
        <kbd>&larr;</kbd> - Previous card
      </p>
      <p>
        <kbd>&rarr;</kbd> - Next card
      </p>
      <p>
        <kbd>SPACE</kbd> / <kbd>&uarr;</kbd> / <kbd>&darr;</kbd> - Flip card
      </p>
      <p>
        <kbd>A</kbd> - Add a card to the current deck
      </p>
      <p>
        <kbd>E</kbd> - Edit card contents
      </p>
      <p>
        <kbd>D</kbd> - Return to the deck
      </p>
    </div>
  </section>

ShortcutHelper.propTypes = propTypes
ShortcutHelper.defaultProps = defaultProps

export default ShortcutHelper
