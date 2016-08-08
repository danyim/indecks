import React from 'react';
import { Link, browserHistory} from 'react-router';
import KeyBinding from 'react-keybinding-component';
import Deck from './Deck';
import CardCount from './CardCount';
import FrontBack from './FrontBack';
import styles from '../styles/components/DeckNavigator';

const DeckNavigator = React.createClass({
  mode: null,
  maxCardIndex: null,

  handleNextCard() {
    if(this.props.cardIndex < this.maxCardIndex) {
      const index = this.props.cardIndex + 1;
      browserHistory.push(`/${this.mode}/${this.props.deck.id}/${index}`);
    }
  },

  handlePrevCard() {
    if(this.props.cardIndex > 1) {
      const index = this.props.cardIndex - 1;
      browserHistory.push(`/${this.mode}/${this.props.deck.id}/${index}`);
    }
  },

  handleKeyDown(e) {
    // Left arrow
    if (e.keyCode === 37) {
      this.handlePrevCard();
    }
    // Right arrow
    if (e.keyCode == 39) {
      this.handleNextCard();
    }
  },

  handleFlip(i) {
    console.log('flippin', i);
    this.setState({
      config: {
        flippedIndex: i
      }
    });
  },

  render() {
    const { cardIndex, deck, mode } = this.props;
    this.maxCardIndex = this.props.deck.cards.length;

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
      <div className={`${styles['deck-navigator']}`}>
        <KeyBinding onKey={ e => this.handleKeyDown(e) } />
        <div className={`${styles['left']}`}>
          <FrontBack flipped={this.props.flipped} handleFlip={this.props.handleFlip} />
        </div>
        <div className={`${styles['deck-nav-controls']}`}>
          <button className="button" ref={this.inputLoaded} onClick={this.handlePrevCard} disabled={this.props.cardIndex > 1 ? false : true}>
            <i className="fa fa-backward"></i>
          </button>
          <button className="button"><i className="fa fa-random"></i></button>
          <button className="button" onClick={this.handleNextCard} disabled={this.props.cardIndex < this.maxCardIndex ? false : true}>
            <i className="fa fa-forward"></i>
          </button>
        </div>
        <div className={`${styles['right']}`}>
          <CardCount current={cardIndex} max={this.maxCardIndex} />
        </div>
      {/*
        <div className={`${styles['deck-nav-links']}`}>
          {actionOnCard}
        </div>
        <div className={`${styles['deck-nav-links']}`}>
          <Link to={`/`}>Back to decks</Link>
        </div>
      */}
      </div>
    )
  },

  propTypes: {
    cardIndex: React.PropTypes.number
  }
});



export default DeckNavigator;
