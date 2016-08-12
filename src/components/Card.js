import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Remarkable from 'remarkable';
import Markdown from './Markdown';
import styles from '../styles/components/Card';

class Card extends React.Component {
  convertToMarkdown(plaintext = '', removeParaTags = false) {
    const md = new Remarkable();
    let rawMarkup = md.render(plaintext);
    if(removeParaTags === true) {
      rawMarkup = rawMarkup.replace('<p>', '');
      rawMarkup = rawMarkup.replace('</p>', '');
    }
    return { __html: rawMarkup };
  }

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
                <span dangerouslySetInnerHTML={this.convertToMarkdown(card.answer)} />
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
