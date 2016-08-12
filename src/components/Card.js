import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Markdown from './Markdown';
import styles from '../styles/components/Card';

class Card extends React.Component {
  render() {
    const { card, flipped } = this.props;

    return (
      <figure className={`grid-figure ${styles['grid-figure']}`}>
        {(() => {
          if(flipped === false) {
            return (
              <div onClick={this.props.handleOnClick || null}>
                <Markdown className={`${styles['card-title']}`} text={card.title} removeParaTags={true} />
              </div>
            );
          }
          else {
            return (
              <figcaption>
                <Markdown text={card.answer} />
              </figcaption>
            );
          }
        })()}
      </figure>
    );
  }
}

Card.defaultProps = {
  flipped: false
};
Card.propTypes = {
  card: React.PropTypes.object.isRequired,
  flipped: React.PropTypes.bool
};

export default Card;