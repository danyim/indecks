import React from 'react'
import PropTypes from 'prop-types'
import Swipeable from 'react-swipeable'
import { CardShape, DeckShape } from './__commonShapes'
import Card from './Card'
import DeckNavigator from './DeckNavigator'
// import styles from '../styles/components/CardView.styl'

class CardView extends React.Component {
  static propTypes = {
    card: CardShape.isRequired,
    deck: DeckShape.isRequired,
    config: PropTypes.shape({ shuffle: PropTypes.bool.isRequired }).isRequired,
    cardIndex: PropTypes.number.isRequired,
    shuffleOn: PropTypes.func.isRequired,
    shuffleOff: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }

  static defaultProps = {}

  static randomCardIndex(max) {
    return Math.floor(Math.random() * max + 1)
  }

  constructor(props) {
    super(props)
    this.state = { flipped: false }

    this.handleEditCard = this.handleEditCard.bind(this)
    this.handleNextCard = this.handleNextCard.bind(this)
    this.handlePrevCard = this.handlePrevCard.bind(this)
    this.handleFlip = this.handleFlip.bind(this)
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this)
  }

  handleNextCard() {
    if (
      this.props.cardIndex < this.props.deck.cards.length ||
      this.props.config.shuffle === true
    ) {
      this.handleFlip(null, false)
      let nextIndex = this.props.cardIndex + 1 // Going forwards
      if (this.props.config.shuffle === true) {
        nextIndex = CardView.randomCardIndex(this.props.deck.cards.length)
      }

      this.props.push(`/view/${this.props.deck.id}/${nextIndex}`)
    }
  }

  handlePrevCard() {
    if (this.props.cardIndex > 1 || this.props.config.shuffle === true) {
      this.handleFlip(null, false)
      let nextIndex = this.props.cardIndex - 1 // Going backwards
      if (this.props.config.shuffle === true) {
        nextIndex = CardView.randomCardIndex(this.props.deck.cards.length)
      }
      this.props.push(`/view/${this.props.deck.id}/${nextIndex}`)
    }
  }

  handleEditCard() {
    this.props.push(`/edit/${this.props.deck.id}/${this.props.cardIndex}`)
  }

  /**
   * Flips the card
   */
  handleFlip(e, flipped = null) {
    if (flipped !== null) {
      this.setState({ flipped })
    } else {
      this.setState({ flipped: !this.state.flipped })
    }
  }

  handleShuffleToggle() {
    if (this.props.config.shuffle === true) {
      this.props.shuffleOff()
    } else {
      this.props.shuffleOn()
    }
  }

  render() {
    const { card, deck, config, cardIndex } = this.props
    const mode = 'view'

    return (
      <section className="single">
        <Swipeable
          // onSwiping={() => console.log('swiping')}
          // onSwiped={() => console.log('swiped')}
          onSwipedLeft={this.handleNextCard}
          onSwipedRight={this.handlePrevCard}
        >
          <Card
            card={card}
            flipped={this.state.flipped}
            handleOnClick={this.handleFlip}
          />
        </Swipeable>
        <DeckNavigator
          deck={deck}
          cardIndex={cardIndex}
          mode={mode}
          push={this.props.push}
          shuffle={config.shuffle}
          flipped={this.state.flipped}
          handleFlip={this.handleFlip}
          handleNextCard={this.handleNextCard}
          handlePrevCard={this.handlePrevCard}
          handleShuffleToggle={this.handleShuffleToggle}
        />
      </section>
    )
  }
}

export default CardView
