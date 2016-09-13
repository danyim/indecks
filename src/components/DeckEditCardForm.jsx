import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles/components/DeckEdit';

const propTypes = {
  cardIndex: React.PropTypes.number.isRequired,
  deckId: React.PropTypes.string.isRequired,
  handleDeleteCard: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

const defaultProps = {};

const fields = ['title', 'answer'];

class DeckEditCardForm extends React.Component {
  render() {
    const { cardIndex, deckId, handleDeleteCard,
      handleSubmit, pristine, submitting } = this.props;

    return (
      <figure>
        <div className={`${styles['card-content']}`}>
          <form onSubmit={handleSubmit}>
            <Field
              name={`card[${cardIndex}].title`}
              component="input"
              type="text"
              rows="1"
              placeholder="Card Title"
            />
            <Field
              name={`card[${cardIndex}].answer`}
              component="textarea"
              type="text"
              className="mono"
              rows="4"
              placeholder="Card answer"
            />
          </form>
        </div>
        <div className={`${styles['card-actions']}`}>
          <button
            type="submit"
            disabled={pristine || submitting}
          >
            Save
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDeleteCard(cardIndex, deckId)}
          >
            Delete
          </button>
        </div>
      </figure>
    );
  }
}

DeckEditCardForm.propTypes = propTypes;
DeckEditCardForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'deckEditCard',
  fields
})(DeckEditCardForm);
