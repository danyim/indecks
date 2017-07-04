import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import samples from '../data/samples'
import styles from '../styles/components/ImportDeck.styl'

class ImportDeck extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    addDeck: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    maxDeckTitleLength: PropTypes.number,
    maxDeckDescLength: PropTypes.number
  }

  static defaultProps = {
    handleClose: () => {},
    maxDeckTitleLength: 160,
    maxDeckDescLength: 300
  }

  static generateRandomString(length = 8) {
    const chars = '0123456789abcdefABCDEFGHIJKLMNPQRSTUVWXYZ'
    let result = ''
    for (let i = length; i > 0; i -= 1) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }

  constructor(props) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoadSample = this.handleLoadSample.bind(this)

    // Default values for the edit fields
    this.state = {
      title: '',
      description: ''
    }
  }

  handleChange(event, key) {
    const state = { ...this.state }
    state[key] = event.target.value
    this.setState(state)
  }

  handleDrop(files) {
    const file = files[0]
    const reader = new FileReader()
    const addToDeck = inputDeck => {
      const deck = { ...inputDeck }
      deck.id = ImportDeck.generateRandomString() // Generate a new ID regardless
      // Absolutely no validation of the JSON here...
      // We're trusting that the user is providing a indecks-produced deck json
      this.props.addDeck(deck)
    }

    reader.onload = e => {
      const result = e.target.result
      const resultJson = JSON.parse(result)
      if (Array.isArray(resultJson)) {
        // Trying to import multiple decks
        resultJson.forEach(d => {
          addToDeck(d)
        })
        // Navigate to the deck grid view
        this.props.push('/')
      } else {
        // Add the single deck
        addToDeck(resultJson)
        // Close the modal
        this.props.handleClose()
        // Navigate to the newly imported deck
        this.props.push(`/view/${resultJson.id}`)
      }
      // resultJson.id = ImportDeck.generateRandomString(); // Generate a new ID regardless
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
    reader.readAsText(file)
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

    const id = ImportDeck.generateRandomString()
    this.props.addDeck({
      id,
      title: this.state.title,
      description: this.state.description,
      cards: []
    })

    // Close the modal
    this.props.handleClose()
    // Don't go to the deck immediately after creating
    // this.props.push(`/view/${id}`);
    return undefined
  }

  handleLoadSample() {
    let sampleDeck
    samples.forEach(d => {
      sampleDeck = { ...d }
      sampleDeck.id = ImportDeck.generateRandomString()
      this.props.addDeck(sampleDeck)
    })

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
            <input
              type="text"
              className="large-input"
              name="title"
              placeholder="Deck Title"
              maxLength="30"
              onChange={e => this.handleChange(e, 'title')}
            />
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              rows="3"
              onChange={e => this.handleChange(e, 'description')}
            />
            <div>
              <button type="submit" className="button">
                Create Deck
              </button>
            </div>
            <div className={`${styles['or-bar']}`}>
              <hr />
              <p>or</p>
            </div>
            <h4>Import an existing deck collection or deck</h4>
            <Dropzone
              onDrop={this.handleDrop}
              className={`${styles.drop}`}
              activeClassName={`${styles['drop-active']}`}
              rejectClassName={`${styles['drop-reject']}`}
              multiple={false}
              accept="application/json"
            >
              <p>Click here to import or drag and drop the deck JSON here</p>
            </Dropzone>
            <div className={`${styles['or-bar']}`}>
              <hr />
              <p>or</p>
            </div>
            <h4>Use samples</h4>
            <div>
              <button
                type="button"
                className="button"
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
