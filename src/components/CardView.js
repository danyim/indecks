import React from 'react';
import Swipeable from 'react-swipeable';
import { browserHistory } from 'react-router';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import styles from '../styles/components/CardView';

class CardView extends React.Component {
  constructor (props) {
    super(props);
    this.state = { flipped: false };

    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleNextCard = this.handleNextCard.bind(this);
    this.handlePrevCard = this.handlePrevCard.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
  }

  randomCardIndex() {
    return Math.floor((Math.random() * this.maxCardIndex) + 1);
  }

  handleNextCard() {
    if(this.props.cardIndex < this.props.deck.cards.length || this.props.config.shuffle === true) {
      this.handleFlip(null, false);
      let nextIndex = this.props.cardIndex + 1; // Going forwards
      if(this.props.config.shuffle === true) {
        nextIndex = this.randomCardIndex();
      }

      browserHistory.push(`/view/${this.props.deck.id}/${nextIndex}`);
    }
  }

  handlePrevCard() {
    if(this.props.cardIndex > 1 || this.props.config.shuffle === true) {
      this.handleFlip(null, false);
      let nextIndex = this.props.cardIndex - 1; // Going backwards
      if(this.props.config.shuffle === true) {
        nextIndex = this.randomCardIndex();
      }
      browserHistory.push(`/view/${this.props.deck.id}/${nextIndex}`);
    }
  }

  handleEditCard() {
    browserHistory.push(`/edit/${this.props.deck.id}/${this.props.cardIndex}`);
  }

  handleFlip(e, flipped) {
    if(flipped !== undefined) {
      this.setState({ flipped: flipped });
    }
    else {
      this.setState({ flipped: !this.state.flipped });
    }
  }

  handleShuffleToggle() {
    this.props.toggleShuffle();
  }

  render() {
    const { card, deck, config, cardIndex } = this.props;
    const mode = 'view';

    return (
      <section className="single">
        <Swipeable
          onSwipedUp={() => this.handleFlip()}
          onSwipedDown={this.handleEditCard}
          onSwipedLeft={this.handleNextCard}
          onSwipedRight={this.handlePrevCard}>
          <Card card={card} flipped={this.state.flipped} handleOnClick={this.handleFlip} />
        </Swipeable>
        <DeckNavigator deck={deck} cardIndex={cardIndex}
          mode={mode}
          flipped={this.state.flipped}
          config={config}
          handleFlip={this.handleFlip}
          handleShuffleToggle={this.handleShuffleToggle} />
      </section>
    )
  }
}

export default CardView;
