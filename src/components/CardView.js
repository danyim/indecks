import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import styles from '../styles/components/CardView';

class CardView extends React.Component {
  constructor (props) {
    super(props);
    this.state = { flipped: false };
    this.handleFlip = this.handleFlip.bind(this);
    this.handleShuffleToggle = this.handleShuffleToggle.bind(this);
  }

  handleFlip(flipped) {
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
        <Card card={card} flipped={this.state.flipped} />
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
