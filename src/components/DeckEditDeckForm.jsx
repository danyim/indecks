import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles/components/CardEdit';

const propTypes = {
  handleDeckSubmit: React.PropTypes.func.isRequired
};

const defaultProps = {};

const fields = ['title', 'description'];

class DeckEditDeckForm extends React.Component {
  render() {
    const { handleDeckSubmit } = this.props;

    return (
      <form className="edit-form" onSubmit={handleDeckSubmit}>
        <Field
          name="title"
          component="textarea"
          type="text"
          className="large-input"
          rows="1"
          placeholder="Deck Title"
        />
        <Field
          name="description"
          component="textarea"
          type="text"
          className="mono"
          rows="4"
          placeholder="Deck Description"
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}

DeckEditDeckForm.propTypes = propTypes;
DeckEditDeckForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'deckEditDeck',
  fields
})(DeckEditDeckForm);
