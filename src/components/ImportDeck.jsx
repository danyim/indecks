import React from 'react';
import { browserHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import samples from '../data/samples';
import styles from '../styles/components/ImportDeck';

const propTypes = {
  addDeck: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func
};

const defaultProps = {
  handleClose: () => {}
};

class ImportDeck extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoadSample = this.handleLoadSample.bind(this);
    this.renderCancelButton = this.renderCancelButton.bind(this);
  }

  generateRandomString(length = 8) {
    const chars = '0123456789abcdefABCDEFGHIJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  handleDrop(files) {
    const file = files[0];
    const reader = new FileReader();
    const addToDeck = inputDeck => {
      const deck = { ...inputDeck };
      deck.id = this.generateRandomString(); // Generate a new ID regardless
      // Absolutely no validation of the JSON here...
      // We're trusting that the user is providing a indecks-produced deck json
      this.props.addDeck(deck);
    };

    reader.onload = e => {
      const result = e.target.result;
      const resultJson = JSON.parse(result);
      if (Array.isArray(resultJson)) {
        // Trying to import multiple decks
        for (const d of resultJson) {
          addToDeck(d);
        }
        // Navigate to the deck grid view
        browserHistory.push('/');
      } else {
        // Add the single deck
        addToDeck(resultJson);
        // Close the modal
        this.props.handleClose();
        // Navigate to the newly imported deck
        browserHistory.push(`/view/${resultJson.id}`);
      }
      // resultJson.id = this.generateRandomString(); // Generate a new ID regardless
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
    };
    reader.readAsText(file);
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.refs.title.value.trim() === '') {
      return false;
    }

    const id = this.generateRandomString();
    this.props.addDeck({
      id,
      title: this.refs.title.value,
      description: this.refs.description.value,
      cards: []
    });

    // Close the modal
    this.props.handleClose();
    browserHistory.push(`/view/${id}`);
  }

  handleLoadSample() {
    let sampleDeck;
    for (const d of samples) {
      sampleDeck = { ...d };
      sampleDeck.id = this.generateRandomString();
      this.props.addDeck(sampleDeck);
    }

    // Close the modal
    this.props.handleClose();
    browserHistory.push('/');
  }

  renderCancelButton() {
    if (this.props.handleClose) {
      return (
        <div>
          <button
            type="button"
            className="button btn-delete"
            onClick={() => this.props.handleClose()}
          >
            Cancel
          </button>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <section className={`${styles['deck-import']}`}>
        <div className={`${styles['grid-figure']}`}>
          <h2 className={`${styles['header']}`}>Add/Import Deck</h2>
          <form ref="commentForm" className="edit-form" onSubmit={this.handleSubmit}>
            <h4>Create a new deck</h4>
            <input type="text" className="large-input"
              name="title" ref="title"
              placeholder="Deck Title" maxLength="30" />
            <textarea type="text" name="description"
              ref="description" placeholder="Description" rows="3" />
            <div>
              <button type="submit" className="button">Create Deck</button>
            </div>
            <div className={`${styles['or-bar']}`}>
              <hr />
              <p>or</p>
            </div>
            <h4>Import an existing deck</h4>
            <Dropzone
              onDrop={this.handleDrop}
              className={`${styles['drop']}`}
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
                type="button" className="button"
                onClick={() => this.handleLoadSample()}
              >
                Load Sample Decks
              </button>
            </div>
            <br /><br />
            {this.renderCancelButton()}
          </form>
        </div>
      </section>
    );
  }
}

ImportDeck.propTypes = propTypes;
ImportDeck.defaultProps = defaultProps;

export default ImportDeck;
