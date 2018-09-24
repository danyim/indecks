import React from 'react'
import PropTypes from 'prop-types'
import CSV from 'comma-separated-values'
import Dropzone from 'react-dropzone'
import { generateRandomString } from '../utils'
import ModalHelpButton from './ModalHelpButton'
import styles from '../styles/components/ImportDeck.styl'

class ImportDeck extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    addDeck: PropTypes.func.isRequired,
    loadSampleDecks: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    maxDeckTitleLength: PropTypes.number,
    maxDeckDescLength: PropTypes.number,
  }

  static defaultProps = {
    handleClose: () => {},
    maxDeckTitleLength: 160,
    maxDeckDescLength: 300,
  }

  // Default values for the edit fields
  state = {
    title: '',
    description: '',
    error: null,
  }

  constructor(props) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoadSample = this.handleLoadSample.bind(this)

    this.focusInput = null
  }

  componentDidMount() {
    // This happens a little too fast. If you get to this view via keyboard
    // shortcut, the focus event fires before the keyup and writes the value
    // into the field. Adding a 100ms delay prevents this from happening.
    setTimeout(() => {
      this.focusInput.focus()
    }, 100)
  }

  handleChange(event, key) {
    const state = { ...this.state }
    state[key] = event.target.value
    this.setState(state)
  }

  createShellDeck() {
    return {
      id: generateRandomString(),
      title: 'Imported Deck',
      description: 'Imported from CSV',
    }
  }

  handleDrop(files) {
    const file = files[0]
    const reader = new FileReader()

    reader.onload = e => {
      const result = e.target.result
      let id

      if (file.type === 'text/csv') {
        const csv = CSV.parse(result).map((row, i) => ({
          title: row[0],
          answer: row[1],
          index: i,
        }))
        const deck = this.createShellDeck()
        deck.cards = csv
        this.props.addDeck(deck)
        // Close the modal
        this.props.handleClose()
        // Navigate to the newly imported deck
        this.props.push(`/view/${deck.id}`)
      } else if (file.type === 'application/json') {
        const resultJson = JSON.parse(result)
        if (Array.isArray(resultJson)) {
          // Trying to import multiple decks
          resultJson.forEach(d => {
            this.props.addDeck({ ...d, id: generateRandomString() })
          })
          // Navigate to the deck grid view
          this.props.push('/')
        } else {
          id = generateRandomString()
          // Add the single deck
          this.props.addDeck({ ...resultJson, id })
          // Close the modal
          this.props.handleClose()
          // Navigate to the newly imported deck
          this.props.push(`/view/${id}`)
        }
      }
      // resultJson.id = generateRandomString(); // Generate a new ID regardless
      // // Absolutely no validation of the JSON here...
      // // We're trusting that the user is providing a indecks-produced deck json
      // this.props.addDeck(resultJson);

      // TODO: Parse the contents of the card descriptions into Markdown
      // for(let card of resultJson.cards) {

      // }
      // const md = new Remarkable();
      // const markup = md.render(result);
      // this.setState({unprocessed: result, processed: markup});
      // console.log('complete!', result, markup, resultJson);
      // console.log('complete!', resultJson);
    }

    try {
      reader.readAsText(file)
    } catch (e) {
      this.setState({
        error: 'Invalid file. Must be a valid .csv or .json file',
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    if (
      this.state.title.trim() === '' ||
      this.state.title.length >= this.props.maxDeckTitleLength ||
      this.state.description.length >= this.props.maxDeckDescLength
    ) {
      return false
    }

    const id = generateRandomString()
    this.props.addDeck({
      id,
      title: this.state.title,
      description: this.state.description,
      cards: [],
    })

    // Close the modal
    this.props.handleClose()
    // Don't go to the deck immediately after creating
    // this.props.push(`/view/${id}`);
    return undefined
  }

  handleLoadSample() {
    this.props.loadSampleDecks()

    // Close the modal
    this.props.handleClose()
    this.props.push('/')
  }

  render() {
    return (
      <section className={`${styles['deck-import']}`}>
        <div className={`${styles['grid-figure']}`}>
          <h2 className={`${styles.header}`}>Add/Import Deck</h2>
          <form className="edit-form" onSubmit={this.handleSubmit}>
            <h4>Create a new deck</h4>
            <label htmlFor="title">
              <span>Title</span>
              <input
                type="text"
                className="large-input"
                name="title"
                ref={input => (this.focusInput = input)}
                placeholder="Enter a deck title here"
                maxLength="30"
                onChange={e => this.handleChange(e, 'title')}
              />
            </label>
            <label htmlFor="description">
              <span>Description</span>
              <textarea
                type="text"
                name="description"
                placeholder="Enter a short description of of the deck (Markdown supported)"
                rows="3"
                onChange={e => this.handleChange(e, 'description')}
              />
            </label>
            <div>
              <button type="submit" className="button outline">
                Create Deck
              </button>
            </div>
            <div className={`${styles['or-bar']}`}>
              <hr />
              <p>or</p>
            </div>
            <h4>Import an existing deck collection or deck</h4>
            <p>
              Supports a previous JSON export of your deck collections or a CSV of cards{' '}
              <ModalHelpButton style={{ minWidth: '350px' }}>
                <h4>CSV</h4>
                <p>
                  Imported CSVs should be a standard CSV file with a header row in either of these
                  formats:
                  <ol>
                    <li>
                      Two columns with the headers <code>title</code> and <code>column</code>. This
                      option is easiest if you want to quickly create a deck from existing data.
                    </li>
                    <li>
                      Four columns with the headers: <code>title</code>, <code>description</code>,
                      and <code>cards</code>. This option is best paired with the CSV export
                      function in the Settings.
                    </li>
                  </ol>
                </p>
                <p>
                  <strong>Example</strong>
                </p>
                <ol>
                  <li>
                    <code>
                      &quot;title&quot;,&quot;answer&quot;
                      <br />
                      &quot;My test title&quot;,&quot;Test description&quot;
                      <br />
                      &quot;Another title&quot;,&quot;Yet another description&quot;
                      <br />
                      &quot;My demo card&quot;,&quot;Test data&quot;
                    </code>
                  </li>
                  <li>
                    <code>
                      &quot;title&quot;,&quot;description&quot;,&quot;cards&quot;
                      <br />
                      &quot;My Deck&quot;,&quot;Description of Deck&quot;,&quot;[ ... ]&quot;
                      <br />
                    </code>
                  </li>
                </ol>
              </ModalHelpButton>
            </p>
            <Dropzone
              onDrop={this.handleDrop}
              className={`${styles.drop}`}
              activeClassName={`${styles['drop-active']}`}
              rejectClassName={`${styles['drop-reject']}`}
              multiple={false}
              accept="application/json,text/csv"
            >
              <p>Click here or drag and drop the deck JSON/CSV file in the box</p>
              {this.state.error !== null && (
                <div className={`error ${styles.error}`}>{this.state.error}</div>
              )}
            </Dropzone>
            <div className={`${styles['or-bar']}`}>
              <hr />
              <p>or</p>
            </div>
            <h4>Use samples</h4>
            <div>
              <button
                type="button"
                className="button outline"
                onClick={() => this.handleLoadSample()}
              >
                Load Sample Decks
              </button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default ImportDeck
