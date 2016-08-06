// Component deprecated? -- Not sure if using anymore.
import React from 'react';
import { Link, browserHistory } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const AddDeck = React.createClass({
  navigateToAddDeck(deckId) {
    browserHistory.push(`/add`);
  },

  render() {
    return (
      <figure className="grid-figure">
        <h1 className="deck-title" onClick={() => this.navigateToAddDeck()}>+</h1>
        <figcaption>
          <p>Add/import a new deck</p>
        </figcaption>
      </figure>
    );
  }
})

export default AddDeck;
