import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles/components/DeckEdit';

const propTypes = {
  cardIndex: React.PropTypes.number.isRequired,
  deckId: React.PropTypes.string.isRequired,
  handleDeleteCard: React.PropTypes.func.isRequired,
  handleCardSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  key: React.PropTypes.number.isRequired
};

const defaultProps = {};

const fields = ['title', 'answer'];

class DeckEditCardForm extends React.Component {
  render() {
    const { cardIndex, deckId, handleDeleteCard,
      handleCardSubmit, pristine, submitting } = this.props;

    return (
      <figure>
        <div className={`${styles['card-content']}`}>
          <form onSubmit={handleCardSubmit}>
            <Field
              name={`title`}
              component="input"
              type="text"
              rows="1"
              placeholder="Card Title"
            />
            <Field
              name={`answer`}
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

// TODO: Need to figure out a way to enumerate this form so that we can track it individually when it updates
// !! One idea: increase the scope of DeckEditCardForm to encompass all cards
// shown in the deck view instead of a single card, then only one
// <form> tag reequired and we can enumerate the fields using name='title[whatever]' etc.
export default reduxForm({
  form: `deckEditCard`,
  fields
})(DeckEditCardForm);
