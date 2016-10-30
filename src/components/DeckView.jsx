import React from 'react';
import Card from './Card';
import { RIEInput, RIETextArea } from 'riek';
import { Link, browserHistory } from 'react-router';
import ExportDeckButton from './ExportDeckButton';
import slug from 'slug';
import styles from '../styles/components/DeckView';

const propTypes = {
  deck: React.PropTypes.object.isRequired,
  handleEditDeck: React.PropTypes.func.isRequired,
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
              classInvalid="invalid" />
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
            <p>
              <strong>
                {`${this.props.deck.cards.length} cards in this deck`}
              </strong>
            </p>
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

        <div className={`wrap-row ${styles['grid']}`}>
          {
            this.props.deck.cards.map((c, i) =>
              <Card
                card={c}
                key={i}
                handleOnClick={
                  () => this.handleOnCardClick(this.props.deck.id, i)
                }
              />
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
