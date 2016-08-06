import React from 'react';
import { Link, browserHistory } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Dropzone from 'react-dropzone';
import Remarkable from 'remarkable';

const ImportDeck = React.createClass({
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
    const id = 'testingid';
    this.props.addDeck({
      id: id,
      title: this.refs.title.value,
      description: this.refs.description.value,
      cards: []
    });

    browserHistory.push(`/view/${id}`);
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
            <Dropzone
              onDrop={this.handleDrop}
              className="drop"
              activeClassName="drop-active"
              rejectClassName="drop-reject"
              multiple={false}
              accept="application/json">
              <p>(Optional) Drop your deck JSON here</p>
            </Dropzone>
            <br /><br />
            <div>
              <button type="submit">Create</button>
            </div>
          </form>
        </figure>
      </section>
    );
  }
})

export default ImportDeck;
