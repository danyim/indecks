import { Link, browserHistory} from 'react-router';
import React from 'react';
import Deck from './Deck';

const DeckNavigator = React.createClass({
  mode: null,
  nextCard() {
    const index = this.props.cardIndex + 1;
    browserHistory.push(`/${this.mode}/${this.props.deck.id}/${index}`);
  },

  prevCard() {
    const index = this.props.cardIndex - 1;
    browserHistory.push(`/${this.mode}/${this.props.deck.id}/${index}`);
  },

  render() {
    const { cardIndex, deck, mode } = this.props;
    const maxCardIndex = deck.cards.length;

    if(mode !== 'edit' && mode !== 'view') {
      throw Error('Mode is not edit or view');
    }
    else {
      this.mode = mode;
    }

    let actionOnCard;
    if(mode === 'edit') {
      actionOnCard = <Link to={`/view/${deck.id}/${cardIndex}`}>View card</Link>;
    }
    else if(mode === 'view') {
      actionOnCard = <Link to={`/edit/${deck.id}/${cardIndex}`}>Edit card</Link>;
    }

    return (
      <div className="deck-navigator">
        <h2>{cardIndex} of {maxCardIndex}</h2>
        <button className="button" onClick={this.prevCard} disabled={this.props.cardIndex > 1 ? false : true}>Previous</button>
        <button>Shuffle</button>
        <button className="button" onClick={this.nextCard} disabled={this.props.cardIndex < maxCardIndex ? false : true}>Next</button>
        <p>{actionOnCard}</p>
        <p><Link to={`/`}>Back to decks</Link></p>
      </div>
    )
  },

  propTypes: {
    cardIndex: React.PropTypes.number
  }
});



export default DeckNavigator;
