import React from 'react';
import { RIEInput, RIETextArea } from 'riek';
import { Link, browserHistory } from 'react-router';
import slug from 'slug';
import Card from './Card';
import ExportDeckButton from './ExportDeckButton';
import styles from '../styles/components/DeckView';

const propTypes = {
  deck: React.PropTypes.object.isRequired,
  handleDuplicateCard: React.PropTypes.func.isRequired,
  handleEditDeck: React.PropTypes.func.isRequired,
  handleRemoveCard: React.PropTypes.func.isRequired,
  handleRemoveDeck: React.PropTypes.func.isRequired
};

const defaultProps = {};

class DeckView extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditDeckDetails = this.handleEditDeckDetails.bind(this);
  }

  // Parses all the cards of a deck object and performs a special replacement
  mdReplacer(k, v) {
    if(k === 'cards') {
      const cards = [...v];
      for(let card of cards) {
        // card.description = 'This is a test';
      }
      return cards;
    }
    return v;
  }

  handleCardView(deckId, i) {
    browserHistory.push(`/view/${deckId}/${i + 1}`);
  }

  handleCardDuplicate(deckId, i) {
    this.props.handleDuplicateCard(
      i + 1, // expects a cardIndex, which is 1-based
      deckId
    );
  }

  handleCardMove(deckId, i) {
    // TODO: Some implementation here
  }

  handleCardEdit(deckId, i) {
    browserHistory.push(`/edit/${deckId}/${i + 1}`);
  }

  handleCardDelete(deckId, i) {
    if (confirm('Are you sure?')) {
      this.props.handleRemoveCard(
        i + 1, // expects a cardIndex, which is 1-based
        deckId
      );
      browserHistory.push(`/view/${deckId}`);
    }
  }

  handleOnCardClick(deckId, i) {
    browserHistory.push(`/edit/${deckId}/${i + 1}`);
  }

  handleEditDeckDetails(data) {
    this.props.handleEditDeck(
      this.props.deck.id,
      data.title ? data.title : this.props.deck.title,
      data.description ? data.description : this.props.deck.description);
  }

  validateDescription(text) {
    return text.trim() !== '' && text.length > 0 && text.length < 300;
  }

  validateTitle(text) {
    return text.length > 0 && text.length < 160;
  }

  render() {
    const emptyMsg = (() => {
      if (this.props.deck.cards.length === 0) {
        return (
          <p className="center">
            Click the + button on the top left to add a card
          </p>
        );
      }
      return null;
    })();

    return (
      <section className={`${styles['deck-view']}`}>
        <div className={`${styles['title-card']}`}>
          <div className={`${styles['title-text']}`}>
            <RIEInput
              value={this.props.deck.title}
              change={this.handleEditDeckDetails}
              propName="title"
              className="large editable"
              minLength="1"
              maxLength="160"
              validate={this.validateTitle}
              classLoading="loading"
              classInvalid="invalid"
            />
            <p>
              <strong>
                {`${this.props.deck.cards.length} cards`}
              </strong>
            </p>
            <RIETextArea
              value={this.props.deck.description}
              change={this.handleEditDeckDetails}
              propName="description"
              className="paragraph editable m-t"
              minLength="1"
              maxLength="300"
              rows="6"
              validate={this.validateDescription}
              classLoading="loading"
              classInvalid="invalid"
            />
          </div>
          <div className={`${styles['control-buttons']}`}>
            <Link className="button" to={`/view/${this.props.deck.id}/1`}>
              <span>
                Play Deck
              </span>
            </Link>
            {/*
              <Link className="button" to={`/edit/${this.props.deck.id}`}>
                <span>
                  Edit Details
                </span>
              </Link>
            */}
            <ExportDeckButton
              filename={`${slug(this.props.deck.title)}.json`}
              label="Export Deck"
              className="button"
              style={{}}
              /*
                // Use this if you want to use the replacer
                exportFile={() =>  JSON.stringify(deck, this.mdReplacer, 2)}
              */
              exportFile={() => JSON.stringify(this.props.deck, null, 2)}
            />
            <a
              className="button btn-delete"
              onClick={() => this.props.handleRemoveDeck(this.props.deck.id)}
            >
                Delete Deck
            </a>
          </div>
        </div>

        <div className={`wrap-row ${styles.grid}`}>
          {
            this.props.deck.cards.map((c, i) =>
              <Card
                card={c}
                key={i}
                className={`${styles['card-contents']}`}
                trimOverflow
              >
                <div className={`${styles['card-overlay']}`}>
                  <div className={`${styles['hover-actions-container']}`}>
                    <div className={`${styles['hover-actions']}`}>
                      <button
                        onClick={
                          () => this.handleCardView(this.props.deck.id, i)
                        }
                        className={`${styles['hover-button']}`}
                      >
                        View
                      </button>
                      <button
                        onClick={
                          () => this.handleCardEdit(this.props.deck.id, i)
                        }
                        className={`${styles['hover-button']}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={
                          () => this.handleCardDelete(this.props.deck.id, i)
                        }
                        className={`btn-delete ${styles['hover-button']}`}
                      >
                        Delete
                      </button>
                    </div>

                    <div className={`${styles['hover-actions']}`}>
                      <button
                        onClick={
                          () => this.handleCardDuplicate(this.props.deck.id, i)
                        }
                        className={`${styles['hover-button']}`}
                      >
                        Duplicate
                      </button>
                      {/*
                      <button
                        onClick={
                          () => this.handleCardMove(this.props.deck.id, i)
                        }
                        className={`${styles['hover-button']}`}
                      >
                        Copy To..
                      </button>
                      */}
                    </div>
                  </div>
                </div>
              </Card>
            )
          }
          {emptyMsg}
        </div>
      </section>
    );
  }
}

DeckView.propTypes = propTypes;
DeckView.defaultProps = defaultProps;

export default DeckView;
