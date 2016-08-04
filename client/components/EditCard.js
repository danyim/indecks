import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const EditCard = React.createClass({
  title: null,
  answer: null,
  cardIndex: null,
  deckId: null,

  // Not sure if this is the right path...
  // The text fields are not updating
  handleChangeTitle(e) {
    this.setState({
      deck
    })
  },
  handleChangeAnswer(e) {

  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.editCard(
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
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" ref="title" placeholder="title" onChange={this.handleChangeTitle} defaultValue={card.title} />
          <input type="text" ref="answer" placeholder="answer" defaultValue={card.answer} />
          <input type="submit" hidden />
          {/*<button className="submit">Save</button> */}
        </form>
      </figure>
    );
  }
})

export default EditCard;
