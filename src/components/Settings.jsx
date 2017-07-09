import React from 'react'
import PropTypes from 'prop-types'
import json2csv from 'json2csv'
import { DeckShape } from './__commonShapes'
import BinarySelector from './BinarySelector'
import ExportDeckButton from './ExportDeckButton'
import AuthContainer from '../containers/AuthContainer'
import styles from '../styles/components/Settings.styl'

class Settings extends React.Component {
  static propTypes = {
    decks: PropTypes.arrayOf(DeckShape.isRequired).isRequired,
    deckCount: PropTypes.number.isRequired,
    removeAllDecks: PropTypes.func.isRequired
  }

  static defaultProps = {}

  static handleClearLocalStorage() {
    localStorage.clear()
  }

  constructor(props) {
    super(props)
    this.removeAllDecks = this.removeAllDecks.bind(this)
    this.handleChangeExportType = this.handleChangeExportType.bind(this)
    this.handleExport = this.handleExport.bind(this)

    this.state = {
      exportType: 1
    }
  }

  handleChangeExportType(value) {
    this.setState({ exportType: value })
  }

  handleExport() {
    if (this.state.exportType === 1) {
      // JSON
      // Strip out all the metadata from the cards (such as the createdOn and
      // editedOn fields)
      const sanitizedDeck = this.props.decks.map(d => ({
        ...d,
        cards: d.cards.map(c => ({
          title: c.title,
          answer: c.answer,
          index: c.index
        }))
      }))
      return JSON.stringify(sanitizedDeck, null, 2)
    }
    // Else, it's a CSV
    const fields = ['title', 'description', 'cards']
    return json2csv({ data: this.props.decks, fields })
  }

  removeAllDecks(count) {
    if (
      confirm(
        `Are you sure you want to delete all ${count} decks? ` +
          'This action is permanent.'
      )
    ) {
      this.props.removeAllDecks()
    }
  }

  renderDeleteAll(deckCount) {
    return deckCount === 0
      ? <button
          name="delete-all-decks"
          className="btn-delete"
          disabled="disabled"
        >
          Delete all decks from local storage
        </button>
      : <button
          name="delete-all-decks"
          className="btn-delete"
          onClick={() => this.removeAllDecks(deckCount)}
        >
          Delete all {deckCount} deck(s) from local storage
        </button>
  }

  render() {
    const { deckCount } = this.props

    return (
      <section className={`${styles.settings}`}>
        <h2 className={`${styles.header}`}>Settings</h2>
        <div className={`${styles['settings-content']}`}>
          <p>
            If you&apos;re logged in, any changes made to your decks will
            automatically be saved and synchronized in{' '}
            <strong>real-time</strong>.
          </p>

          {/*
          <label htmlFor='offline-mode'>
            <p><input id='offline-mode' type='checkbox' onChange={() => {}} /> Enable offline support</p>
          </label>
          <label htmlFor='auto-save'>
            <p><input id='auto-save' type='checkbox' onChange={() => {}} /> Save changes automatically to account</p>
          </label>
          */}

          <AuthContainer />
          <div className="control-buttons horizontal">
            <label htmlFor="export">Export your deck collection as</label>
            <BinarySelector
              selection={this.state.exportType}
              leftLabel="JSON"
              rightLabel="CSV"
              handleClick={this.handleChangeExportType}
            />
            <ExportDeckButton
              filename={
                this.state.exportType === 1 ? 'indecks.json' : 'indecks.csv'
              }
              label="Export"
              className="button"
              disabled={deckCount === 0}
              style={{}}
              exportFile={this.handleExport}
            />
          </div>
          <br />
          {this.renderDeleteAll(deckCount)}
          {/*
            <button
              name="clear-storage"
              className="btn-delete"
              onClick={Settings.handleClearLocalStorage}
            >
              Clear local storage
            </button>
          */}
        </div>
      </section>
    )
  }
}

export default Settings
