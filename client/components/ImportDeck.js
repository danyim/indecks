import React from 'react';
import { Link, browserHistory } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const ImportDeck = React.createClass({
  navigateToAddDeck(deckId) {
    browserHistory.push(`/add`);
  },

  render() {
    const deck = {
      title: '1',
      description: '2'
    };

    return (
      <section className="deck-view">
        <div>
        yo yo yo
          <h1>{deck.title}</h1>
          <p>{deck.description}</p>
        </div>
      </section>
    );
  }
})

export default ImportDeck;
