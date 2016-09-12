import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles/components/CardEdit';

const propTypes = {
  title: React.PropTypes.string,
  answer: React.PropTypes.string,
  cardIndex: React.PropTypes.number.isRequired,
  deckId: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
};

const defaultProps = {
  title: '',
  answer: '',
};

const fields = ['cardTitle', 'cardAnswer'];

const renderTitleField = (field) => (
  <div className="input-row">
    <input {...field.input} type="text"/>
    {field.meta.touched && field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>
)

class CardEditForm extends React.Component {
  render() {
    const { title, answer, deckId, cardIndex, handleSubmit,
      handleDelete, handleCancel } = this.props;

    return (
      <form ref="commentForm" className="edit-form" onSubmit={handleSubmit}>
        <Field
          name="cardTitle"
          component="textarea"
          type="text"
          className="large-input"
          rows="2"
          placeholder="Title"
        />
        <Field
          name="cardAnswer"
          component="textarea"
          type="text"
          className="mono"
          rows="6"
          placeholder="Answer (Markdown)"
        />
        { /* <p><a>Preview Changes</a></p> */ }

        <div className={`${styles['control-buttons']}`}>
          <button type="submit" className="button">Save Card</button>
          <button type="button" className="button" onClick={() => handleCancel()}>Cancel</button>
          <button
            type="button"
            className="button btn-delete"
            onClick={() => handleDelete(cardIndex, deckId)}
          >
            Remove from Deck
          </button>
        </div>
      </form>
    );
  }
}

CardEditForm.propTypes = propTypes;
CardEditForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'cardEdit',
  fields
})(CardEditForm);
