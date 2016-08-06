import React from 'react';
import { Link } from 'react-router';

const DeckAdd = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.CardEdit(
      this.refs.title.value,
      this.refs.answer.value,
      this.cardIndex,
      this.deckId
    );
  },
  render() {

    return (
      <figure className="grid-figure">
        <form ref="commentForm" className="edit-form" onSubmit={this.handleSubmit}>
          <input type="text" className="large-input" name="title" ref="title" placeholder="Title" />
          <textarea type="text" className="mono" name="answer" ref="answer" placeholder="Answer (Markdown)" rows="4" />
          <button type="submit" className="button">Save</button>
        </form>
      </figure>
    );
  }
})

export default DeckAdd;
