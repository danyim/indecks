import React from 'react';
import styles from '../styles/components/ShortcutHelper';

const propTypes = {};
const defaultProps = {};

class ShortcutHelper extends React.Component {
  render() {
    return (
      <section className={`${styles['shotcut-helper']}`}>
        <h2 className={`${styles['header']}`}>Shortcuts</h2>
        <div className={`${styles['settings-content']}`}>
          <h4>Global</h4>
          <p><kbd>I</kbd> - Add/Import Deck</p>
          <p><kbd>D</kbd> - Deck quick selector</p>
          <p><kbd>,</kbd> - Settings</p>
          <p><kbd>/</kbd> - Keyboard Shortcuts</p>

          <h4>While viewing a deck</h4>
          <p><kbd>S</kbd> - Toggle shuffle</p>
          <p><kbd>&larr;</kbd> - Previous card</p>
          <p><kbd>&rarr;</kbd> - Next card</p>
          <p><kbd>SPACE</kbd> - Flip card</p>
          <p><kbd>E</kbd> - Edit card contents</p>
          <p><kbd>D</kbd> - Return to the deck</p>
        </div>
      </section>
    );
  }
}

ShortcutHelper.propTypes = propTypes;
ShortcutHelper.defaultProps = defaultProps;

export default ShortcutHelper;
