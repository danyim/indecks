import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import CardPreview from './CardPreview'
import styles from '../styles/components/CardEdit.styl'

const propTypes = {
  cardIndex: PropTypes.number.isRequired,
  deckId: PropTypes.string.isRequired,
  formValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
}

const defaultProps = {
  title: '',
  answer: ''
}

const fields = ['cardTitle', 'cardAnswer']

export const CardEditForm = (props) => {
  const { deckId, cardIndex, handleSubmit,
    handleDelete, handleCancel, formValues: form } = props

  return (
    <form className='edit-form' onSubmit={handleSubmit}>
      <Field
        name='cardTitle'
        component='textarea'
        type='text'
        className='large-input'
        rows='2'
        placeholder='Title'
      />
      <Field
        name='cardAnswer'
        component='textarea'
        type='text'
        className='mono'
        rows='6'
        placeholder='Answer (Markdown)'
      />

      <CardPreview
        title={form !== undefined ? form.values.cardTitle : ''}
        answer={form !== undefined ? form.values.cardAnswer : ''}
      />

      <div className={`${styles['control-buttons']}`}>
        <button type='submit' className='button'>Save Card</button>
        <button
          type='button'
          className='button'
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button
          type='button'
          className='button btn-delete'
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
