import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Card = React.createClass({
  render() {
    const { card } = this.props;

    return (
      <figure className="grid-figure">
        <div className="card-title">
          <h1>{card.title}</h1>
        </div>

        <figcaption>
          <p>{card.answer}</p>
        </figcaption>
      </figure>
    );
  }
})

export default Card;
