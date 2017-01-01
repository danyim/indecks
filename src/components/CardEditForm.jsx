import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Markdown from './Markdown';
import styles from '../styles/components/CardEdit';

const propTypes = {
  title: React.PropTypes.string,
  answer: React.PropTypes.string,
  cardIndex: React.PropTypes.number.isRequired,
  deckId: React.PropTypes.string.isRequired,
  formValues: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
};

const defaultProps = {
  title: '',
  answer: '',
};

const fields = ['cardTitle', 'cardAnswer'];

class CardEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.renderPreview.bind(this, this.renderPreview);

    this.state = {
      showPreview: false
    }
  }

  togglePreview() {
    const currState = this.state;
    currState.showPreview = !currState.showPreview;
    this.setState(currState);
  }

  renderPreview() {
    if(!this.state.showPreview) {
      return '';
    }
    return (
      <div className={`${styles['preview-pane']}`}>
        <h1>
          <Markdown
            className={`${styles['card-title']}`}
            text={this.props.formValues.values.cardTitle}
          />
        </h1>
        <hr />
        <Markdown
          className={`${styles['card-answer']}`}
          text={this.props.formValues.values.cardAnswer}
        />
      </div>
    );
  }

  render() {
    const { deckId, cardIndex, handleSubmit,
      handleDelete, handleCancel } = this.props;

    return (
      <form className="edit-form" onSubmit={handleSubmit}>
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

        <div className={`${styles['preview']}`}>
          <p className="pointer m-t" onClick={() => this.togglePreview()}>
            Preview [{this.state.showPreview ? '-' : '+'}]
          </p>
        </div>
        {this.renderPreview()}

        <div className={`${styles['control-buttons']}`}>
          <button type="submit" className="button">Save Card</button>
          <button
            type="button"
            className="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
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
