import React from 'react';
import { Link, browserHistory } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import styles from '../styles/components/CardEdit';

class CardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.title = null;
    this.answer = null;
    this.cardIndex = null;
    this.deckId = null;

    this.checkIfDirty = this.checkIfDirty.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Not sure if this is the right path...
  // The text fields are not updating
  handleChangeTitle(e) {
    // this.setState({
    //   deck
    // })
  }

  handleChangeAnswer(e) {

  }

  checkIfDirty() {
    const card = this.props.card;
    return (this.refs.title.value !== card.title || this.refs.answer.value !== card.answer);
  }

  handleCancel() {
    if(this.checkIfDirty()) {
      if(confirm('Are you sure? You have unsaved changes.')) {
        browserHistory.push(`/view/${this.deckId}`);
      }
    }
    else {
      browserHistory.push(`/view/${this.deckId}/${this.cardIndex}`);
    }
  }

  handleDelete(cardIndex, deckId) {
    if(confirm('Are you sure?')) {
      this.props.removeCard(
        cardIndex,
        deckId
      );
      browserHistory.push(`/view/${this.deckId}`);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editCard(
      this.refs.title.value,
      this.refs.answer.value,
      this.cardIndex,
      this.deckId
    );
    browserHistory.push(`/view/${this.deckId}/${this.cardIndex}`)
  }

  render() {
    const { title = '', answer = '' } = this.props.card;
    this.deckId = this.props.deckId || this.params.deckId;
    this.cardIndex = this.props.cardIndex;

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`}>
        <form ref="commentForm" className="edit-form" onSubmit={this.handleSubmit}>
          <textarea className="large-input" name="title" ref="title" placeholder="Title" defaultValue={title} rows="2" />
          <textarea className="mono" name="answer" ref="answer" placeholder="Answer (Markdown)" defaultValue={answer} rows="6" />
          <p><a>Preview Changes</a></p>
          <button type="submit" className="button">Save Card</button>
          <button type="button" className="button" onClick={() => this.handleCancel()}>Cancel</button>
          <button type="button" className="button btn-delete" onClick={() => this.handleDelete(this.cardIndex, this.deckId)}>Remove from Deck</button>
        </form>
      </figure>
    );
  }
}

export default CardEdit;
