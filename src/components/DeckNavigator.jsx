import React from 'react'
import PropTypes from 'prop-types'
import KeyBinding from 'react-keybinding-component'
import classNames from 'classnames'
import { DeckShape } from './__commonShapes'
import CardCount from './CardCount'
import FrontBack from './FrontBack'
import styles from '../styles/components/DeckNavigator.styl'

class DeckNavigator extends React.Component {
  static propTypes = {
    deck: DeckShape.isRequired,
    cardIndex: PropTypes.number.isRequired,
    handleFlip: PropTypes.func.isRequired,
    flipped: PropTypes.bool.isRequired,
    shuffle: PropTypes.bool.isRequired,
    handleShuffleToggle: PropTypes.func.isRequired,
    handleNextCard: PropTypes.func.isRequired,
    handlePrevCard: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
  }

  static defaultProps = {}

  static randomCardIndex(max) {
    return Math.floor(Math.random() * max + 1)
  }

  constructor(props) {
    super(props)
    this.mode = null
    this.maxCardIndex = null

    this.handleAddCard = this.handleAddCard.bind(this)
    this.handleFlip = this.handleFlip.bind(this)
    this.handleReturnToDeck = this.handleReturnToDeck.bind(this)
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this)
  }

  handleFlip(flipped) {
    this.props.handleFlip(null, flipped)
  }

  handleAddCard() {
    this.props.push(`/add/${this.props.deck.id}`)
  }

  handleEditCard() {
    this.props.push(`/edit/${this.props.deck.id}/${this.props.cardIndex}`)
  }

  handleReturnToDeck() {
    this.props.push(`/view/${this.props.deck.id}`)
  }

  handleShuffleToggle() {
    this.props.handleShuffleToggle()
  }

  handleKeyDown(e) {
    if (e.keyCode === 37) {
      // <-
      this.props.handlePrevCard()
    } else if (e.keyCode === 39) {
      // ->
      this.props.handleNextCard()
    } else if (e.keyCode === 69) {
      // e
      this.handleEditCard()
    } else if (e.keyCode === 68) {
      // d
      this.handleReturnToDeck()
    } else if (e.keyCode === 72) {
      // h
      this.handleShuffleToggle()
    } else if (e.keyCode === 65) {
      // a
      this.handleAddCard()
    } else if (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40) {
      // space, up arrow, down arrow
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
      'btn-active': this.props.shuffle === true,
      'btn-inactive': this.props.shuffle !== true
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
            onClick={this.props.handlePrevCard}
            disabled={
              !(this.props.cardIndex > 1 || this.props.shuffle === true)
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
            onClick={this.props.handleNextCard}
            disabled={
              this.props.cardIndex >= this.maxCardIndex &&
              this.props.shuffle !== true
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

export default DeckNavigator
