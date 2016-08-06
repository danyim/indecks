import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Remarkable from 'remarkable';

const Card = React.createClass({
  convertToMarkdown(plaintext = '') {
    const md = new Remarkable();
    const rawMarkup = md.render(plaintext);
    return { __html: rawMarkup };
  },
  render() {
    const { card } = this.props;

    return (
      <figure className="grid-figure">
        <div className="card-title" onClick={this.props.handleOnClick || null}>
          <h1>{card.title}</h1>
        </div>

        <figcaption>
          <span dangerouslySetInnerHTML={this.convertToMarkdown(card.answer)} />
          <pre>{card.answer}</pre>
        </figcaption>
      </figure>
    );
  }
})

export default Card;
