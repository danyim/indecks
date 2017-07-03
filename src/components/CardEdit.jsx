import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import KeyBinding from 'react-keybinding-component'
import { CardShape } from './__commonShapes'
import CardEditForm from './CardEditForm'
import styles from '../styles/components/CardEdit.styl'

class CardEdit extends React.Component {
  static propTypes = {
    card: CardShape.isRequired,
    cardIndex: PropTypes.number.isRequired,
    deckId: PropTypes.string.isRequired,
    editCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.checkIfDirty = this.checkIfDirty.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  checkIfDirty() {
    const { title, answer } = this.props.card
    return (
      this.props.form.cardEdit.values.cardTitle !== title ||
      this.props.form.cardEdit.values.cardAnswer !== answer
    )
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      // escape
      this.handleCancel()
    }

    e.stopPropagation()
  }

  handleCancel() {
    if (this.checkIfDirty()) {
      if (
        confirm(
          'Are you sure you want to cancel? You have unsaved changes that will be lost.'
        )
      ) {
        browserHistory.push(`/view/${this.props.deckId}`)
      }
    } else {
      browserHistory.push(`/view/${this.props.deckId}/${this.props.cardIndex}`)
    }
  }

  handleDelete(cardIndex, deckId) {
    if (confirm('Are you sure?')) {
      this.props.removeCard(cardIndex, deckId)
      browserHistory.push(`/view/${this.props.deckId}`)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.editCard(
      this.props.form.cardEdit.values.cardTitle,
      this.props.form.cardEdit.values.cardAnswer,
      this.props.cardIndex,
      this.props.deckId
    )
    browserHistory.push(`/view/${this.props.deckId}/${this.props.cardIndex}`)
  }

  render() {
    const { card, deckId, cardIndex } = this.props
    const { title = '', answer = '' } = card

    const initialValues = {
      cardTitle: title,
      cardAnswer: answer
    }

    return (
      <section className="single">
        <figure className={`grid-figure ${styles['grid-figure']}`}>
          <KeyBinding onKey={e => this.handleKeyDown(e)} />
          <CardEditForm
            deckId={deckId}
            cardIndex={cardIndex}
            title={title}
            answer={answer}
            formValues={this.props.form.cardEdit}
            initialValues={initialValues}
            handleSubmit={this.handleSubmit}
            handleDelete={this.handleDelete}
            handleCancel={this.handleCancel}
          />
        </figure>
      </section>
    )
  }
}

export default CardEdit
