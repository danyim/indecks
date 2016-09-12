import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Markdown from './Markdown';
import styles from '../styles/components/Card';

const propTypes = {
  card: React.PropTypes.object.isRequired,
  flipped: React.PropTypes.bool,
  handleOnClick: React.PropTypes.func
};

const defaultProps = {
  flipped: false,
  handleOnClick: null
};

class Card extends React.Component {
  renderEmpty() {
    <div className={`${styles['center']}`}>
      <p className={`${styles['grey']}`}>No answer provided</p>
    </div>;
  }

  renderMarkdown() {
    const { card, flipped } = this.props;
    if(flipped === false) {
      return (
        <div>
          <Markdown className={`${styles['card-title']}`} text={card.title} removeParaTags={true} />
        </div>
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

  render() {
    const { card, flipped } = this.props;

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`} onClick={this.props.handleOnClick}>
        {this.renderMarkdown()}
      </figure>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
