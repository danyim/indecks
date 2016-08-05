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
        <form ref="commentForm" className="edit-form" onSubmit={this.handleSubmit}>
          {/*<label for="title">Title Card</label>*/}
          <input type="text" className="large-input" name="title" ref="title" placeholder="Title" onChange={this.handleChangeTitle} defaultValue={card.title} />
          {/*<label for="answer">Answer Card</label>*/}
          <input type="text" name="answer" ref="answer" placeholder="Answer" defaultValue={card.answer} />
          <input type="submit" hidden />
          {/*<button className="submit">Save</button> */}
        </form>
      </figure>
    );
  }
})

export default EditCard;
