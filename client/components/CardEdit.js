import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const CardEdit = React.createClass({
  title: null,
  answer: null,
  cardIndex: null,
  deckId: null,

  // Not sure if this is the right path...
  // The text fields are not updating
  handleChangeTitle(e) {
    // this.setState({
    //   deck
    // })
  },
  handleChangeAnswer(e) {

  },
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
    const { card, cardIndex, deckId } = this.props;
    this.title = card.title;
    this.answer = card.answer;
    this.cardIndex = cardIndex;
    this.deckId = deckId;

    return (
      <figure className="grid-figure">
        <form ref="commentForm" className="edit-form" onSubmit={this.handleSubmit}>
          <input type="text" className="large-input" name="title" ref="title" placeholder="Title" defaultValue={card.title} />
          <textarea type="text" className="mono" name="answer" ref="answer" placeholder="Answer (Markdown)" defaultValue={card.answer} rows="4" />
          <button type="submit" className="button">Save</button>
        </form>
      </figure>
    );
  }
})

export default CardEdit;
