import PropTypes from 'prop-types'
import React from 'react'
import ExportDeckButton from './ExportDeckButton'
import styles from '../styles/components/Settings.styl'

const propTypes = {
  decks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired
    }).isRequired).isRequired
  }).isRequired).isRequired,
  deckCount: PropTypes.number.isRequired,
  removeAllDecks: PropTypes.func.isRequired
}

// articles: PropTypes.arrayOf(PropTypes.shape({
//   url: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
// }).isRequired).isRequired,

const defaultProps = {}

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.removeAllDecks = this.removeAllDecks.bind(this)
  }

  removeAllDecks (count) {
    if (confirm(`Are you sure you want to delete all ${count} decks? ` +
      'This action is permanent.')) {
      this.props.removeAllDecks()
    }
  }

  renderDeleteAll (deckCount) {
    return deckCount === 0
      ? (
        <button
          className='btn-delete'
          disabled='disabled'
        >
          Delete all decks from local storage
        </button>
      )
      : (
        <button
          className='btn-delete'
          onClick={() => this.removeAllDecks(deckCount)}
        >
          Delete all {deckCount} deck(s) from local storage
        </button>
      )
  }

  render () {
    const { deckCount } = this.props

    return (
      <section className={`${styles.settings}`}>
        <h2 className={`${styles.header}`}>Settings</h2>
        <div className={`${styles['settings-content']}`}>
          <p>
            The decks you create are automatically saved to your browser&apos;s
            local storage.
          </p>
          <ExportDeckButton
            filename='indecks.json'
            label='Download your deck collection as JSON'
            className='button'
            disabled={deckCount === 0}
            style={{}}
            exportFile={() => JSON.stringify(this.props.decks, null, 2)}
          />
          {this.renderDeleteAll(deckCount)}
        </div>
      </section>
    )
  }
}

Settings.propTypes = propTypes
Settings.defaultProps = defaultProps

export default Settings
