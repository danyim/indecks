import React from 'react';

const propTypes = {
  cards: React.PropTypes.array.isRequired,
  deck: React.PropTypes.object.isRequired,
  deckId: React.PropTypes.string.isRequired
};

const defaultProps = {};

class DeckEdit extends React.Component {
  render() {
    const { cards, deck, deckId } = this.props;

    return (
      <section className="single">
        <h1>{deck.title}</h1>
        <p>{deck.description}</p>
        <ul>
          {cards.map((card, i) =>
            <li key={i}>
              <input type="text" defaultValue={card.title} />
              <textarea defaultValue={card.description} />
            </li>
          )}
        </ul>
      </section>
    )
  }
}

DeckEdit.propTypes = propTypes;
DeckEdit.defaultProps = defaultProps;

export default DeckEdit;
