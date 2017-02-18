import React from 'react';
import { RIEInput, RIETextArea } from 'riek';
import { Link, browserHistory } from 'react-router';
import slug from 'slug';
import Card from './Card';
import ExportDeckButton from './ExportDeckButton';
import Overlay from './Overlay';
import OverlayRow from './OverlayRow';
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
      // for(let card of cards) {
        // card.description = 'This is a test';
      // }
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

  // handleCardMove(deckId, i) {
  //   // TODO: Some implementation here
  // }

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

  renderEmpty(numCards) {
    if (numCards === 0) {
      return (
        <p className="center">
          Click the + button on the top left to add a card
        </p>
      );
    }
  }

  render() {
    const { deck } = this.props;

    return (
      <section className={`${styles['deck-view']}`}>
        <div className={`${styles['title-card']}`}>
          <div className={`${styles['title-text']}`}>
            <RIEInput
              value={deck.title}
              change={this.handleEditDeckDetails}
              propName="title"
              className="large editable"
              minLength="1"
              maxLength="160"
              validate={this.validateTitle}
              placeholder="Click here to add a title"
              classLoading="loading"
              classInvalid="invalid"
            />
            <p>
              <strong>
                {`${deck.cards.length} cards`}
              </strong>
            </p>
            <RIETextArea
              value={deck.description}
              change={this.handleEditDeckDetails}
              propName="description"
              className="paragraph editable m-t"
              minLength="1"
              maxLength="300"
              rows="6"
              validate={this.validateDescription}
              placeholder="Click here to add a description"
              classLoading="loading"
              classInvalid="invalid"
            />
          </div>
          <div className={`${styles['control-buttons']}`}>
            <Link className="button" to={`/view/${deck.id}/1`}>
              <span>
                Play Deck
              </span>
            </Link>
            <ExportDeckButton
              filename={`${slug(deck.title)}.json`}
              label="Export Deck"
              className="button"
              style={{}}
              /*
                // Use this if you want to use the replacer
                exportFile={() =>  JSON.stringify(deck, this.mdReplacer, 2)}
              */
              exportFile={() => JSON.stringify(deck, null, 2)}
            />
            <a
              className="button btn-delete"
              onClick={() => this.props.handleRemoveDeck(deck.id)}
            >
                Delete Deck
            </a>
          </div>
        </div>

        <div className={`wrap-row ${styles.grid}`}>
          {
            deck.cards.map((c, i) =>
              <Card
                card={c}
                key={`card_${deck.id}__${c.index}`}
                className={`${styles['card-contents']}`}
                trimOverflow
              >
                {
                  // TODO: Break this into an Overlay component and use on Card
                  // and Deck
                }
                <Overlay>
                  <OverlayRow>
                    <button
                      onClick={
                        () => this.handleCardView(deck.id, i)
                      }
                    >
                      View
                    </button>
                    <button
                      onClick={
                        () => this.handleCardEdit(deck.id, i)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={
                        () => this.handleCardDelete(deck.id, i)
                      }
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </OverlayRow>
                  <OverlayRow>
                    <button
                      onClick={() => this.handleCardDuplicate(deck.id, i)}
                    >
                      Duplicate
                    </button>
                    {/*
                    <button
                      onClick={
                        () => this.handleCardMove(deck.id, i)
                      }
                      className={`${styles['hover-button']}`}
                    >
                      Copy To..
                    </button>
                    */}
                  </OverlayRow>
                </Overlay>
              </Card>
            )
          }
          { this.renderEmpty(deck.cards.length) }
        </div>
      </section>
    );
  }
}

DeckView.propTypes = propTypes;
DeckView.defaultProps = defaultProps;

export default DeckView;
