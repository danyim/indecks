import React from 'react';
import { Link, browserHistory } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Dropzone from 'react-dropzone';
import Remarkable from 'remarkable';

const ImportDeck = React.createClass({
  files: null,

  navigateToAddDeck(deckId) {
    browserHistory.push(`/add`);
  },

  handleDrop(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target.result;
      const resultJson = JSON.parse(result);
      // TODO: Parse the contents of the card descriptions into Markdown
      // for(let card of resultJson.cards) {

      // }
      // const md = new Remarkable();
      // const markup = md.render(result);
      // this.setState({unprocessed: result, processed: markup});
      // console.log('complete!', result, markup, resultJson);
      console.log('complete!', resultJson);
    }
    reader.readAsText(file);
    console.log('File', file);
    // console.log('examining', contents);

    this.file = files[0];
  },

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.refs);
  },

  render() {
    const deck = {
      title: '1',
      description: '2'
    };

    return (
      <section className="deck-import">
        <figure className="grid-figure">
          <aside className="figure-box">
            <div className="container">
              <i className="symbol fa fa-list-alt fa-3"></i>
            </div>
          </aside>
          <form ref="commentForm" className="edit-form" onSubmit={this.handleSubmit}>
            <input type="text" className="large-input" name="title" ref="title" placeholder="Deck Title" maxLength="30" />
            <textarea type="text" name="description" ref="description" placeholder="Description" rows="3" />
            {/*<input type="url" name="url" ref="url" placeholder="http://example.com/something.json"/>*/}
            <Dropzone
              onDrop={this.handleDrop}
              className="drop"
              activeClassName="drop-active"
              rejectClassName="drop-reject"
              multiple={false}
              accept="application/json">
              <p>Drop your JSON here</p>
            </Dropzone>
            <br /><br />
            <div>
              <button type="submit">Create</button>
            </div>
          </form>
        </figure>
        shit we found
        <pre>

        </pre>
        {/*
        <figure className="grid-figure">
          <h1>{deck.title}</h1>
          <p>{deck.description}</p>
        </figure>
        */}
      </section>
    );
  }
})

export default ImportDeck;
