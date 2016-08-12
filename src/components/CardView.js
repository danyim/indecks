import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import styles from '../styles/components/CardView';

class CardView extends React.Component {
  constructor (props) {
    super(props);
    this.state = { flipped: false };
    this.handleFlip = this.handleFlip.bind(this);
  }

  handleFlip(flipped) {
    if(flipped !== undefined) {
      this.setState({ flipped: flipped });
    }
    else {
      this.setState({ flipped: !this.state.flipped });
    }
  }

  render() {
    const { card, deck, config, cardIndex } = this.props;
    const mode = 'view';

    return (
      <section className="single">
        <Card card={card} flipped={this.state.flipped} />
        <DeckNavigator deck={deck} cardIndex={cardIndex} mode={mode} flipped={this.state.flipped} handleFlip={this.handleFlip} />
      </section>
    )
  }
}

export default CardView;
