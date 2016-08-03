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
        <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <span className="likes-heart">Add</span>
        </CSSTransitionGroup>

        <figcaption>
          <p>Add/import a new deck</p>
          <div className="control-buttons">

          </div>
        </figcaption>
      </figure>
    );
  }
})

export default AddDeck;
