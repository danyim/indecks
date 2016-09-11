import React from 'react';
import styles from '../styles/components/DeckEdit';

const propTypes = {
  cards: React.PropTypes.array.isRequired,
  deck: React.PropTypes.object.isRequired,
  deckId: React.PropTypes.string.isRequired,
  editCard: React.PropTypes.func.isRequired,
  removeCard: React.PropTypes.func.isRequired
};

const defaultProps = {};

class DeckEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.handleUpdateCard = this.handleUpdateCard.bind(this);
  }

  handleDeleteCard(index, deckId) {
    this.props.removeCard(index, deckId);
  }

  handleUpdateCard(index, deckId, card) {
    // console.log(`updating card @${index}`);
    this.props.editCard(card.title, card.description, index, deckId);
  }

  render() {
    const { cards, deck, deckId } = this.props;

    return (
      <section className={`${styles['deck-edit']}`}>
        <div className={`${styles['card']}`}>
          <section className={`${styles['title-section']}`}>
            <textarea
              className="large-input"
              name="title" ref="title"
              placeholder="Deck Title"
              defaultValue={deck.title}
              rows="1"
            />
            <textarea
              className="mono"
              name="answer" ref="answer"
              placeholder="Deck Description"
              defaultValue={deck.description}
              rows="4"
            />
          </section>
          <section className={`${styles['card-section']}`}>
            {cards.map((card, i) =>
              <figure key={i}>
                <div className={`${styles['card-content']}`}>
                  <input
                    type="text"
                    placeholder="Card title"
                    value={card.title}
                    onChange={() => this.handleUpdateCard(i, deckId, card)}
                  />
                  <textarea
                    placeholder="Card answer"
                    value={card.answer}
                    onChange={() => this.handleUpdateCard(i, deckId, card)}
                  />
                </div>
                <div className={`${styles['card-actions']}`}>
                  <button
                    className="btn-delete"
                    onClick={() => this.handleDeleteCard(i, deckId)}
                  >
                    Delete
                  </button>
                </div>
              </figure>
            )}
          </section>
        </div>
      </section>
    );
  }
}

DeckEdit.propTypes = propTypes;
DeckEdit.defaultProps = defaultProps;

export default DeckEdit;
