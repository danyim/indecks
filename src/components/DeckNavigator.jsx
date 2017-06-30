import PropTypes from 'prop-types'
import React from 'react'
import { browserHistory } from 'react-router'
import KeyBinding from 'react-keybinding-component'
import classNames from 'classnames'
import { DeckShape } from './__commonShapes'
import CardCount from './CardCount'
import FrontBack from './FrontBack'
import styles from '../styles/components/DeckNavigator.styl'

const propTypes = {
  deck: DeckShape.isRequired,
  cardIndex: PropTypes.number.isRequired,
  handleFlip: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
  handleShuffleToggle: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired
}

const defaultProps = {}

class DeckNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.mode = null
    this.maxCardIndex = null

    this.handleAddCard = this.handleAddCard.bind(this)
    this.handleFlip = this.handleFlip.bind(this)
    this.handleNextCard = this.handleNextCard.bind(this)
    this.handlePrevCard = this.handlePrevCard.bind(this)
    this.handleReturnToDeck = this.handleReturnToDeck.bind(this)
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this)
    this.randomCardIndex = this.randomCardIndex.bind(this)
  }

  randomCardIndex() {
    return Math.floor(Math.random() * this.maxCardIndex + 1)
  }

  handleNextCard() {
    if (
      this.props.cardIndex < this.maxCardIndex ||
      this.props.config.shuffle === true
    ) {
      this.props.handleFlip(null, false)
      let nextIndex = this.props.cardIndex + 1 // Going forwards
      if (this.props.config.shuffle === true) {
        nextIndex = this.randomCardIndex()
      }

      browserHistory.push(`/${this.mode}/${this.props.deck.id}/${nextIndex}`)
    }
  }

  handlePrevCard() {
    if (this.props.cardIndex > 1 || this.props.config.shuffle === true) {
      this.props.handleFlip(null, false)
      let nextIndex = this.props.cardIndex - 1 // Going backwards
      if (this.props.config.shuffle === true) {
        nextIndex = this.randomCardIndex()
      }
      browserHistory.push(`/${this.mode}/${this.props.deck.id}/${nextIndex}`)
    }
  }

  handleFlip(flipped) {
    this.props.handleFlip(null, flipped)
  }

  handleAddCard() {
    browserHistory.push(`/add/${this.props.deck.id}`)
  }

  handleEditCard() {
    browserHistory.push(`/edit/${this.props.deck.id}/${this.props.cardIndex}`)
  }

  handleReturnToDeck() {
    browserHistory.push(`/view/${this.props.deck.id}`)
  }

  handleShuffleToggle() {
    this.props.handleShuffleToggle()
  }

  handleKeyDown(e) {
    if (e.keyCode === 37) {
      // <-
      this.handlePrevCard()
    } else if (e.keyCode === 39) {
      // ->
      this.handleNextCard()
    } else if (e.keyCode === 69) {
      // e
      this.handleEditCard()
    } else if (e.keyCode === 68) {
      // d
      this.handleReturnToDeck()
    } else if (e.keyCode === 83) {
      // s
      this.handleShuffleToggle()
    } else if (e.keyCode === 65) {
      // a
      this.handleAddCard()
    } else if (e.keyCode === 32) {
      // space
      this.handleFlip()
    }

    e.stopPropagation()
  }

  render() {
    const { cardIndex, deck, mode, flipped } = this.props
    this.maxCardIndex = deck.cards.length

    if (mode !== 'edit' && mode !== 'view') {
      throw Error('Mode is not edit or view')
    } else {
      this.mode = mode
    }

    // let actionOnCard;
    // if(mode === 'edit') {
    //   actionOnCard = <Link to={`/view/${deck.id}/${cardIndex}`}>View card</Link>;
    // } else if(mode === 'view') {
    //   actionOnCard = <Link to={`/edit/${deck.id}/${cardIndex}`}>Edit card</Link>;
    // }

    const shuffle = classNames({
      'btn-active': this.props.config.shuffle === true,
      'btn-inactive': this.props.config.shuffle !== true
    })

    return (
      <div className={`${styles['deck-navigator']}`}>
        <KeyBinding
          onKey={e => this.handleKeyDown(e)}
          preventInputConflict
          preventPropagation
        />
        <div className={`${styles.left}`}>
          <FrontBack flipped={flipped} handleFlip={this.handleFlip} />
        </div>
        <div className={`${styles['deck-nav-controls']}`}>
          <button
            className="button"
            title="Previous Card"
            onClick={this.handlePrevCard}
            disabled={
              !(this.props.cardIndex > 1 || this.props.config.shuffle === true)
            }
          >
            <i className="fa fa-backward" />
          </button>
          <button
            className={`button ${shuffle}`}
            title="Shuffle"
            onClick={this.handleShuffleToggle}
          >
            <i className="fa fa-random" />
          </button>
          <button
            className="button"
            title="Next Card"
            onClick={this.handleNextCard}
            disabled={
              this.props.cardIndex >= this.maxCardIndex &&
              this.props.config.shuffle !== true
            }
          >
            <i className="fa fa-forward" />
          </button>
        </div>
        <div className={`${styles.right}`}>
          <CardCount current={cardIndex} max={this.maxCardIndex} />
        </div>
      </div>
    )
  }
}

DeckNavigator.propTypes = propTypes
DeckNavigator.defaultProps = defaultProps

export default DeckNavigator
