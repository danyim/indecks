import React from 'react';
import { Link, browserHistory } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Dropzone from 'react-dropzone';
import Remarkable from 'remarkable';
import samples from '../data/samples'
import styles from '../styles/components/ImportDeck';

const ImportDeck = React.createClass({
  generateRandomString(length = 8) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },

  navigateToAddDeck(deckId) {
    browserHistory.push(`/add`);
  },

  handleDrop(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target.result;
      const resultJson = JSON.parse(result);

      // Absolutely no validation of the JSON here...
      // We're trusting that the user is providing a indecks-produced deck json
      this.props.addDeck(resultJson);
      browserHistory.push(`/view/${resultJson.id}`);
      // TODO: Parse the contents of the card descriptions into Markdown
      // for(let card of resultJson.cards) {

      // }
      // const md = new Remarkable();
      // const markup = md.render(result);
      // this.setState({unprocessed: result, processed: markup});
      // console.log('complete!', result, markup, resultJson);
      // console.log('complete!', resultJson);
    }
    reader.readAsText(file);
  },

  handleSubmit(e) {
    e.preventDefault();
    const id = this.generateRandomString();
    this.props.addDeck({
      id: id,
      title: this.refs.title.value,
      description: this.refs.description.value,
      cards: []
    });

    browserHistory.push(`/view/${id}`);
  },

  handleLoadSample() {
    let sampleDeck;
    for(let d of samples) {
      sampleDeck = { ...d };
      sampleDeck.id = this.generateRandomString();
      this.props.addDeck(sampleDeck);
    }
    browserHistory.push(`/`);
  },

  render() {
    const deck = {
      title: '1',
      description: '2'
    };

    return (
      <section className={`${styles['deck-import']}`}>
        <div className={`${styles['grid-figure']}`}>
          <aside className={`${styles['figure-box']}`}>
            <div className={`${styles['symbol-container']}`}>
              <i className={`fa fa-list-alt fa-3 ${styles['symbol']}`}></i>
            </div>
          </aside>
          <form ref="commentForm" className="edit-form" onSubmit={this.handleSubmit}>
            <input type="text" className="large-input" name="title" ref="title" placeholder="Deck Title" maxLength="30" />
            <textarea type="text" name="description" ref="description" placeholder="Description" rows="3" />
            <Dropzone
              onDrop={this.handleDrop}
              className={`${styles['drop']}`}
              activeClassName={`${styles['drop-active']}`}
              rejectClassName={`${styles['drop-reject']}`}
              multiple={false}
              accept="application/json">
              <p>(Optional) Drop your deck JSON here</p>
            </Dropzone>
            <br /><br />
            <div>
              <button type="submit" className="button">Create</button>
            </div>
            <div>
              <button type="button" className="button" onClick={() => this.handleLoadSample()}>Load Sample Decks</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
})

export default ImportDeck;
