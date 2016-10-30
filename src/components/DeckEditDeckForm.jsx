import React from 'react';
import InlineEdit from 'react-inline-edit';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles/components/DeckEdit';

const propTypes = {
  handleDetailSubmit: React.PropTypes.func.isRequired
};

const defaultProps = {};

const fields = ['title', 'description'];

class DeckEditDeckForm extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleEditDescription(data) {
    console.log('description changed', data);
  }

  handleEditTitle(data) {
    console.log('title changed', data);
  }

  validateDescription(text) {
    return text.trim() !== '';
  }

  validateTitle(text) {
    return text.length > 0 && text.length < 160;
  }

  render() {
    const { handleDetailSubmit } = this.props;

    return (
      <div>
        Inline:
        <InlineEdit
          validate={this.validateTitle}
          change={this.handleEditTitle}
          paramName="title"
          placeholder="Add a deck title"
          defaultValue="This is the default value for the title"
          minLength="1"
          maxLength="160"
        />
        <InlineEdit
          validate={this.validateDescription}
          change={this.handleEditDescription}
          paramName="description"
          placeholder="Add a description for the deck (Markdown supported)"
          defaultValue="This is the default value for the description"
          className="mono"
          maxLength="500"
        />
        <form className="edit-form" onSubmit={handleDetailSubmit}>
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
      </div>
    );
  }
}

DeckEditDeckForm.propTypes = propTypes;
DeckEditDeckForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'deckEditDeck',
  fields
})(DeckEditDeckForm);
