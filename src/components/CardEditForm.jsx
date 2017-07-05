import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CardPreview from './CardPreview'
import styles from '../styles/components/CardEdit.styl'

const propTypes = {
  cardIndex: PropTypes.number.isRequired,
  deckId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  formValues: PropTypes.object
}

const defaultProps = {
  formValues: null
}

const fields = ['cardTitle', 'cardAnswer']

export const CardEditForm = props => {
  const {
    deckId,
    cardIndex,
    handleSubmit,
    handleDelete,
    handleCancel,
    formValues: form
  } = props

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label htmlFor="cardTitle">
        <span>Card Title</span>
        <Field
          name="cardTitle"
          component="textarea"
          type="text"
          className="large-input"
          rows="2"
          placeholder="Title"
        />
      </label>

      <label htmlFor="cardAnswer">
        <span>
          Card Contents&nbsp;&nbsp;(This input supports{' '}
          <a
            href="//guides.github.com/features/mastering-markdown/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Markdown
          </a>)
        </span>
        <Field
          name="cardAnswer"
          component="textarea"
          type="text"
          className="mono"
          rows="6"
          placeholder="Answer (Markdown)"
        />
      </label>

      <CardPreview
        title={form ? form.values.cardTitle : ''}
        answer={form ? form.values.cardAnswer : ''}
      />

      <div className={`${styles['control-buttons']}`}>
        <button type="submit" className="button">
          Save Card
        </button>
        <button type="button" className="button" onClick={() => handleCancel()}>
          Cancel
        </button>
      </div>
      <div className={`${styles['control-buttons']}`}>
        <button
          type="button"
          className="button btn-delete"
          onClick={() => handleDelete(cardIndex, deckId)}
        >
          Remove from Deck
        </button>
      </div>
    </form>
  )
}

CardEditForm.propTypes = propTypes
CardEditForm.defaultProps = defaultProps

export default reduxForm({
  form: 'cardEdit',
  fields
})(CardEditForm)
