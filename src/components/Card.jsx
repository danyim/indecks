import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Markdown from './Markdown';
import styles from '../styles/components/Card';

const propTypes = {
  card: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  flipped: React.PropTypes.bool,
  handleOnClick: React.PropTypes.func
};

const defaultProps = {
  className: '',
  flipped: false,
  handleOnClick: null
};

class Card extends React.Component {
  renderEmpty() {
    console.log('attempting to render empty');
    return (
      <div className={`${styles['center']}`}>
        <p className={`${styles['grey']}`}>This card does not have an answer yet</p>
      </div>
    );
  }

  renderMarkdown() {
    const { card, flipped } = this.props;
    if(flipped === false) {
      return (
        <Markdown className={`${styles['card-title']}`} text={card.title} removeParaTags={true} />
      );
    }
    else {
      return (
        <figcaption>
          <Markdown text={card.answer} />
          {card.answer === '' ? this.renderEmpty() : null}
        </figcaption>
      );
    }
  }

  renderHasAnswerIcon(card) {
    if(!(card && card.answer && card.answer.trim() !== '')) {
      return (
        <div className={`${styles['no-answer']}`} title="This card has no answer">
          <div>No answer</div>
        </div>
      );
    }
    return;
  }

  render() {
    const { card, flipped, className } = this.props;

    return (
      <figure className={`grid-figure ${styles['grid-figure']} ${className}`} onClick={this.props.handleOnClick}>
        <div className={`${styles['card-contents']}`}>
          {this.renderMarkdown()}
        </div>
        {this.renderHasAnswerIcon(card)}
        {this.props.children}
      </figure>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
