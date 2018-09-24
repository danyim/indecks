import React from 'react'
import PropTypes from 'prop-types'
import { CardShape } from './__commonShapes'
import Markdown from './Markdown'
import styles from '../styles/components/Card.styl'

class Card extends React.Component {
  static propTypes = {
    card: CardShape.isRequired,
    className: PropTypes.string,
    flipped: PropTypes.bool,
    handleOnClick: PropTypes.func,
    trimOverflow: PropTypes.bool,
    trimOverflowLength: PropTypes.number,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    flipped: false,
    handleOnClick: () => {},
    trimOverflow: false,
    trimOverflowLength: 125,
    children: null,
  }

  static renderEmpty() {
    return (
      <div className={`${styles.center}`}>
        <p className={`${styles.grey}`}>This card does not have an answer yet</p>
      </div>
    )
  }

  static renderHasAnswerIcon(card) {
    if (!(card && card.answer && card.answer.trim() !== '')) {
      return (
        <div className={`${styles['no-answer']}`} title="This card has no answer">
          <div>No answer</div>
        </div>
      )
    }
    return null
  }

  constructor(props) {
    super(props)

    this.trimOverflowTitle.bind(this, this.trimOverflowTitle)
  }

  trimOverflowTitle(text) {
    const textWithoutImg = text.replace(/!\[.*\]\(.*\)/g, '')
    return this.props.trimOverflow && textWithoutImg.length > this.props.trimOverflowLength
      ? `${textWithoutImg.substr(0, this.props.trimOverflowLength)}...`
      : text
  }

  renderMarkdown() {
    const { card, flipped } = this.props
    if (flipped === false) {
      return (
        <Markdown
          className={`card-title ${styles['card-title']}`}
          text={this.trimOverflowTitle(card.title)}
        />
      )
    }
    return (
      <figcaption>
        {card.answer !== null && card.answer !== '' ? (
          <Markdown text={card.answer} />
        ) : (
          Card.renderEmpty()
        )}
      </figcaption>
    )
  }

  render() {
    const { card, className, handleOnClick, children } = this.props

    return (
      <figure
        className={`grid-figure ${styles['grid-figure']} ${className}`}
        onClick={() => handleOnClick()}
        role="presentation"
      >
        <div className={`card-contents ${styles['card-contents']}`}>{this.renderMarkdown()}</div>
        {Card.renderHasAnswerIcon(card)}
        {children}
      </figure>
    )
  }
}

export default Card
