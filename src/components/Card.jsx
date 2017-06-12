import React from 'react'
import Markdown from './Markdown'
import styles from '../styles/components/Card.styl'

const propTypes = {
  card: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  flipped: React.PropTypes.bool,
  handleOnClick: React.PropTypes.func,
  trimOverflow: React.PropTypes.bool,
  trimOverflowLength: React.PropTypes.number,
  children: React.PropTypes.node
}

const defaultProps = {
  className: '',
  flipped: false,
  handleOnClick: () => {},
  trimOverflow: false,
  trimOverflowLength: 125,
  children: null
}

class Card extends React.Component {
  constructor (props) {
    super(props)

    this.trimOverflowTitle.bind(this, this.trimOverflowTitle)
  }

  trimOverflowTitle (text) {
    const textWithoutImg = text.replace(/!\[.*\]\(.*\)/g, '')
    return (
      this.props.trimOverflow &&
      textWithoutImg.length > this.props.trimOverflowLength
      ? `${textWithoutImg.substr(0, this.props.trimOverflowLength)}...`
      : text
    )
  }

  renderEmpty () {
    return (
      <div className={`${styles.center}`}>
        <p className={`${styles.grey}`}>
          This card does not have an answer yet
        </p>
      </div>
    )
  }

  renderMarkdown () {
    const { card, flipped } = this.props
    if (flipped === false) {
      return (
        <Markdown className={`${styles['card-title']}`} text={this.trimOverflowTitle(card.title)} />
      )
    }
    return (
      <figcaption>
        {
          card.answer !== null && card.answer !== ''
            ? <Markdown text={card.answer} />
            : this.renderEmpty()
        }
      </figcaption>
    )
  }

  renderHasAnswerIcon (card) {
    if (!(card && card.answer && card.answer.trim() !== '')) {
      return (
        <div className={`${styles['no-answer']}`} title='This card has no answer'>
          <div>No answer</div>
        </div>
      )
    }
    return null
  }

  render () {
    const { card, className, handleOnClick, children } = this.props

    return (
      <figure
        className={`grid-figure ${styles['grid-figure']} ${className}`}
        onClick={() => handleOnClick()}
      >
        <div className={`${styles['card-contents']}`}>
          {this.renderMarkdown()}
        </div>
        {this.renderHasAnswerIcon(card)}
        {children}
      </figure>
    )
  }
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps

export default Card
