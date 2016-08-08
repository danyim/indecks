import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/DeckAdd';

const DeckAdd = React.createClass({
  handleSubmit(e, deckId) {
    e.preventDefault();
    this.props.addCard(
      this.refs.title.value,
      this.refs.answer.value,
      deckId
    );
    browserHistory.push(`/view/${deckId}`);
  },
  render() {
    const { deckId } = this.props.params;

    return (
      <section className="single">
        <figure className={`grid-figure ${styles['grid-figure']}`}>
          <form ref="commentForm" className="edit-form" onSubmit={e => this.handleSubmit(e, deckId)}>
            <input type="text" className="large-input" name="title" ref="title" placeholder="Title" />
            <textarea type="text" className="mono" name="answer" ref="answer" placeholder="Answer (Markdown)" rows="4" />
            <button type="submit" className="button">Save</button>
          </form>
        </figure>
      </section>
    );
  }
})

export default DeckAdd;
