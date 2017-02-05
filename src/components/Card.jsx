import React from 'react';
import Markdown from './Markdown';
import styles from '../styles/components/Card';

const propTypes = {
  card: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  flipped: React.PropTypes.bool,
  handleOnClick: React.PropTypes.func,
  trimOverflow: React.PropTypes.bool
};

const defaultProps = {
  className: '',
  flipped: false,
  handleOnClick: null,
  trimOverflow: false
};

const TITLE_MAX_CHAR_LEN = 125;

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.trimOverflowTitle.bind(this, this.trimOverflowTitle);
  }

  trimOverflowTitle(text) {
    return this.props.trimOverflow &&
      text.length > TITLE_MAX_CHAR_LEN ?
        `${text.substr(0, TITLE_MAX_CHAR_LEN)}...` : text;
  }

  renderEmpty() {
    // console.log('attempting to render empty');
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
        <Markdown className={`${styles['card-title']}`} text={this.trimOverflowTitle(card.title)} />
      );
    }
    return (
      <figcaption>
        <Markdown text={card.answer} />
        {card.answer === '' ? this.renderEmpty() : null}
      </figcaption>
    );
  }

  renderHasAnswerIcon(card) {
    if(!(card && card.answer && card.answer.trim() !== '')) {
      return (
        <div className={`${styles['no-answer']}`} title="This card has no answer">
          <div>No answer</div>
        </div>
      );
    }
  }

  render() {
    const { card, className } = this.props;

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
