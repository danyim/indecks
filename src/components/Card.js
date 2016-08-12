import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Remarkable from 'remarkable';
import styles from '../styles/components/Card';

class Card extends React.Component {
  // // Simplified markdown parser supporting bold, italics, and inline code
  // convertToSimplifiedMarkdown(plaintext = '') {
  //   let return = '';
  //   const opStack = [];
  //   for(let i = 0; i < plaintext.length; i++) {
  //     const ch = plaintext[i];
  //     // Check if we encountered a symbol
  //     if(ch === '`' || ch === '*' || ch === `_`) {
  //       if(opStack.find(ch) === null) {
  //         opStack.push[i];
  //       }
  //       else {

  //       }
  //     }
  //     return +=
  //   }
  //   const rawMarkup = md.render(plaintext);
  //   return { __html: rawMarkup };
  // }

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
                <h1 className={`${styles['card-title']}`} dangerouslySetInnerHTML={this.convertToMarkdown(card.title, true)} />
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
