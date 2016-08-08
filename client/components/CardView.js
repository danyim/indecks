import React from 'react';
import Card from './Card';
import DeckNavigator from './DeckNavigator';
import styles from '../styles/components/CardView';

class CardView extends React.Component {
  constructor (props) {
    super(props)

    this.handleFlip = this.handleFlip.bind(this);
  }

  componentDidMount() {
    this.setState({ flipped: false });
  }

  handleFlip(flipped = true) {
    console.log('flippin, now it\'s', flipped);
    this.setState({ flipped: flipped });
  }

  render() {
    const { deckId, cardIndex } = this.props.params;
    // index of the deck
    const i = this.props.decks.findIndex((deck) => deck.id === deckId)
    // get us the post
    const deck = this.props.decks[i];
    const mode = 'view';

    return (
      <section className="single">
        <Card card={deck.cards[cardIndex - 1]} flipped={false} />
        <DeckNavigator deck={deck} cardIndex={parseInt(cardIndex)} mode={mode} flipped={this.flipped} handleFlip={this.handleFlip} />
      </section>
    )
  }
}

export default CardView;
