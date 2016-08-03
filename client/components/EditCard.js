import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const EditCard = React.createClass({
  title: null,
  answer: null,

  // Not sure if this is the right path...
  // The text fields are not updating
  handleChangeTitle(e) {

  },
  handleChangeAnswer(e) {

  },
  handleSubmit() {
    this.props.editCard(this.refs.title, this.refs.answer, this.refs.deckId);
  },
  render() {
    const { card, deckId } = this.props;
    this.title = card.title;
    this.answer = card.answer;

    return (
      <figure className="grid-figure">
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" ref="title" placeholder="title" onChange={this.handleChangeTitle} value={card.title} />
          <input type="text" ref="answer" placeholder="answer" value={card.answer} />
          <input type="hidden" ref="deckId" value={deckId} />
          <input type="submit" hidden />
        </form>

        <button className="button">Save</button>
      </figure>
    );
  }
})

export default EditCard;
