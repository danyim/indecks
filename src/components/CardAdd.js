import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/CardAdd';

class CardAdd extends React.Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // This happens a little too fast. If you get to this view via keyboard
    // shortcut, the focus event fires before the keyup and writes the value
    // into the field.
    setTimeout(() => {
      findDOMNode(this.refs.title).focus()
    }, 100);
  }

  handleSubmit(e, deckId) {
    e.preventDefault();
    const card = {
      title: this.refs.title.value,
      answer: this.refs.answer.value
    };
    this.props.handleSubmit(deckId, card);
  }

  handleCancel() {
    this.props.history.goBack();
  }

  render() {
    const { deckId } = this.props;

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`}>
        <form ref="commentForm" className="edit-form" onSubmit={e => this.handleSubmit(e, deckId)}>
          <input type="text" className="large-input" name="title" ref="title" placeholder="Title" />
          <textarea type="text" className="mono" name="answer" ref="answer" placeholder="Answer (Markdown)" rows="4" />
          <button type="submit" className="button">Save</button>
          <button type="button" className="button" onClick={this.handleCancel}>Cancel</button>
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