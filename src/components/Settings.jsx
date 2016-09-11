import React from 'react';
import ExportDeckButton from './ExportDeckButton';
import styles from '../styles/components/Settings';

const propTypes = {
  decks: React.PropTypes.array.isRequired,
  deckCount: React.PropTypes.number.isRequired,
  removeAllDecks: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.removeAllDecks = this.removeAllDecks.bind(this);
  }

  removeAllDecks(count) {
    if (confirm(`Are you sure you want to delete all ${count} decks? This is a permanent action.`)) {
      this.props.removeAllDecks();
    }
  }

  render() {
    const { deckCount } = this.props;

    const renderDeleteAll = deckCount === 0 ?
      <button
        className="btn-delete"
        disabled="disabled">
        Delete all decks from local storage
      </button>
      :
      <button
        className="btn-delete"
        onClick={() => this.removeAllDecks(deckCount)}>
        Delete all {deckCount} deck(s) from local storage
      </button>;

    return (
      <section className={`${styles['settings-view']}`}>
        <figure className="grid-figure">
          <div className={`${styles['settings-card']}`}>
            <h1>Settings</h1>

            <section className={`${styles['settings-section']}`}>
              <p>
                The decks you create are automatically saved to your browser's
                local storage.
              </p>
              <ExportDeckButton
                filename={`indecks.json`}
                label="Download all decks as JSON"
                className="button"
                style={{}}
                exportFile={() => JSON.stringify(this.props.decks, null, 2)} />
              {renderDeleteAll}
            </section>
          </div>
        </figure>
      </section>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;