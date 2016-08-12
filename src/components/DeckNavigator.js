import React from 'react';
import { Link, browserHistory} from 'react-router';
import KeyBinding from 'react-keybinding-component';
import Deck from './Deck';
import CardCount from './CardCount';
import FrontBack from './FrontBack';
import classNames from 'classnames';
import styles from '../styles/components/DeckNavigator';

class DeckNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.mode = null;
    this.maxCardIndex = null;

    this.handleFlip = this.handleFlip.bind(this);
    this.handleNextCard = this.handleNextCard.bind(this);
    this.handlePrevCard = this.handlePrevCard.bind(this);
  }

  handleNextCard() {
    if(this.props.cardIndex < this.maxCardIndex) {
      this.props.handleFlip(false);
      browserHistory.push(`/${this.mode}/${this.props.deck.id}/${this.props.cardIndex + 1}`);
    }
  }

  handlePrevCard() {
    if(this.props.cardIndex > 1) {
      this.props.handleFlip(false);
      browserHistory.push(`/${this.mode}/${this.props.deck.id}/${this.props.cardIndex - 1}`);
    }
  }

  handleFlip(flipped) {
    this.props.handleFlip(flipped);
  }

  handleEditCard() {
    browserHistory.push(`/edit/${this.props.deck.id}/${this.props.cardIndex}`);
  }

  handleToggleShuffle() {
    this.props.toggleShuffle();
  }

  handleKeyDown(e) {
    if(e.keyCode === 37) { // <-
      this.handlePrevCard();
    }
    else if(e.keyCode === 39) { // ->
      this.handleNextCard();
    }
    else if(e.keyCode === 69) { // e
      this.handleEditCard();
    }
    else if(e.keyCode === 32) { // space
      this.handleFlip();
    }
  }

  render() {
    const { cardIndex, deck, mode, flipped } = this.props;
    this.maxCardIndex = deck.cards.length;

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

    // const shuffle = classNames({
    //   'btn-active': (this.props.config.shuffle === true),
    //   'btn-inactive': (this.props.config.shuffle !== true)
    // });
    // debugger;
    let shuffle = '';

    return (
      <div className={`${styles['deck-navigator']}`}>
        <KeyBinding onKey={ e => this.handleKeyDown(e) } />
        <div className={`${styles['left']}`}>
          <FrontBack flipped={flipped} handleFlip={this.handleFlip} />
        </div>
        <div className={`${styles['deck-nav-controls']}`}>
          <button className="button" ref={this.inputLoaded} onClick={this.handlePrevCard} disabled={this.props.cardIndex > 1 ? false : true}>
            <i className="fa fa-backward"></i>
          </button>
          <button className={`button ${shuffle}`}><i className="fa fa-random"></i></button>
          <button className="button" onClick={this.handleNextCard} disabled={this.props.cardIndex < this.maxCardIndex ? false : true}>
            <i className="fa fa-forward"></i>
          </button>
        </div>
        <div className={`${styles['right']}`}>
          <CardCount current={cardIndex} max={this.maxCardIndex} />
        </div>
      </div>
    )
  }
}

DeckNavigator.propTypes = {
  deck: React.PropTypes.object,
  cardIndex: React.PropTypes.number,
  handleFlip: React.PropTypes.func,
  flipped: React.PropTypes.bool
};

export default DeckNavigator;
