import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/CardAdd';

class CardAdd extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, deckId) {
    e.preventDefault();
    const card = {
      title: this.refs.title.value,
      answer: this.refs.answer.value
    };
    this.props.handleSubmit(deckId, card);
  }

  render() {
    const { deckId } = this.props;

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`}>
        <form ref="commentForm" className="edit-form" onSubmit={e => this.handleSubmit(e, deckId)}>
          <input type="text" className="large-input" name="title" ref="title" placeholder="Title" />
          <textarea type="text" className="mono" name="answer" ref="answer" placeholder="Answer (Markdown)" rows="4" />
          <button type="submit" className="button">Save</button>
        </form>
      </figure>
    );
  }
}

CardAdd.defaultProps = {};
CardAdd.propTypes = {
  deckId: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

export default CardAdd;
