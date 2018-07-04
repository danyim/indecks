import React from "react";
import PropTypes from "prop-types";
import { RIEInput, RIETextArea } from "riek";
import { Link } from "react-router-dom";
import slug from "slug";
import classnames from "classnames";
import { DeckShape } from "./__commonShapes";
import Card from "./Card";
import ExportDeckButton from "./ExportDeckButton";
import Overlay from "./Overlay";
import OverlayRow from "./OverlayRow";
import ModalHelpButton from "./ModalHelpButton";
import styles from "../styles/components/DeckView.styl";

class DeckView extends React.Component {
  static propTypes = {
    deck: DeckShape.isRequired,
    maxDeckTitleLength: PropTypes.number,
    maxDeckDescLength: PropTypes.number,
    handleDuplicateCard: PropTypes.func.isRequired,
    handleEditDeck: PropTypes.func.isRequired,
    handleRemoveCard: PropTypes.func.isRequired,
    handleRemoveDeck: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  };

  static defaultProps = {
    maxDeckTitleLength: 160,
    maxDeckDescLength: 300
  };

  static contextTypes = {
    router: PropTypes.object
  };

  static arrangements = {
    two: "2COL",
    three: "3COL",
    list: "LIST"
  };

  static sorts = {
    created: "CREATED",
    edited: "EDITED",
    unanswered: "UNANSWERED"
  };

  constructor(props) {
    super(props);

    this.handleEditDeckDetails = this.handleEditDeckDetails.bind(this);
    this.handleChangeArrangement = this.handleChangeArrangement.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.validateDescription = this.validateDescription.bind(this);
    this.validateTitle = this.validateTitle.bind(this);

    this.state = {
      arrangement: DeckView.arrangements.two,
      sort: DeckView.sorts.created,
      search: null
    };
  }

  // // Parses all the cards of a deck object and performs a special replacement
  // mdReplacer(k, v) {
  //   if(k === 'cards') {
  //     const cards = [...v];
  //     // for(let card of cards) {
  //       // card.description = 'This is a test';
  //     // }
  //     return cards;
  //   }
  //   return v;
  // }

  handleExport() {
    const sanitizedDeck = {
      ...this.props.deck,
      cards: this.props.deck.cards.map(c => ({
        index: c.index,
        title: c.title,
        answer: c.answer
      }))
    };

    return JSON.stringify(sanitizedDeck, null, 2);
  }

  handleCardView(deckId, i) {
    this.props.push(`/view/${deckId}/${i + 1}`);
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
    this.props.push(`/edit/${deckId}/${i + 1}`);
  }

  handleCardDelete(deckId, i) {
    if (window.confirm("Are you sure?")) {
      this.props.handleRemoveCard(
        i + 1, // expects a cardIndex, which is 1-based
        deckId
      );
      this.props.push(`/view/${deckId}`);
    }
  }

  handleEditDeckDetails(data) {
    this.props.handleEditDeck(
      this.props.deck.id,
      data.title ? data.title : this.props.deck.title,
      data.description ? data.description : this.props.deck.description
    );
  }

  handleChangeArrangement(arrangement) {
    this.setState({ arrangement });
    // if(arrangement === DeckView.arrangements.two) {
    //   this.setState({ arrangement: })
    // } else if(arrangement === DeckView.arrangements.three) {

    // } else if(arrangement === DeckView.arrangements.list) {

    // }
  }

  handleChangeSearch(value) {
    this.setState({
      search: value
    });
  }

  handleChangeSort(sort) {
    this.setState({ sort });
  }

  validateDescription(text) {
    return (
      text.trim() !== "" &&
      text.length > 0 &&
      text.length <= this.props.maxDeckDescLength
    );
  }

  validateTitle(text) {
    return text.length > 0 && text.length <= this.props.maxDeckTitleLength;
  }

  renderEmpty(numCards) {
    if (numCards === 0) {
      return (
        <p className="center">
          Click the + button on the top left to add a card
        </p>
      );
    }
    return null;
  }

  render() {
    const { deck, maxDeckTitleLength, maxDeckDescLength } = this.props;

    const gridClassName = classnames({
      "two-col": this.state.arrangement === DeckView.arrangements.two,
      "three-col": this.state.arrangement === DeckView.arrangements.three
    });

    const filteredCards = deck.cards.filter(c => {
      if (this.state.search && this.state.search !== "") {
        return c.title.toLowerCase().includes(this.state.search.toLowerCase());
      }
      return true;
    });

    return (
      <section className={`${styles["deck-view"]}`}>
        <div className={`${styles["title-card"]}`}>
          <div className={`${styles["title-text"]}`}>
            <RIEInput
              value={deck.title}
              change={this.handleEditDeckDetails}
              propName="title"
              className="large editable"
              minLength="1"
              maxLength={maxDeckTitleLength}
              validate={this.validateTitle}
              placeholder="Click here to add a title"
              classLoading="loading"
              classInvalid="invalid"
            />
            <p>
              <strong>{`${deck.cards.length} cards`}</strong>
              &nbsp;
              <ModalHelpButton style={{ minWidth: "350px" }}>
                <p>
                  Click anywhere on the deck&apos;s title or description to edit
                  the field. Your changes are saved immediately.
                </p>
              </ModalHelpButton>
            </p>
            <RIETextArea
              value={deck.description}
              change={this.handleEditDeckDetails}
              propName="description"
              className="paragraph editable m-t"
              minLength="1"
              maxLength={maxDeckDescLength}
              rows="6"
              validate={this.validateDescription}
              placeholder="Click here to add a description"
              classLoading="loading"
              classInvalid="invalid"
            />{" "}
          </div>
          <div className={`${styles["control-buttons"]}`}>
            <Link className="button outline" to={`/view/${deck.id}/1`}>
              Play Deck&nbsp;&nbsp;
              <i className="fa fa-play-circle" />
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
              exportFile={this.handleExport}
            />
            <button
              className="btn-delete"
              onClick={() => this.props.handleRemoveDeck(deck.id)}
            >
              Delete Deck
            </button>
          </div>
        </div>
        <div className={styles.options}>
          <div className={`${styles.search}`}>
            <input
              type="text"
              name="search-cards"
              placeholder="Search card titles..."
              maxLength={50}
              onChange={e => this.handleChangeSearch(e.target.value)}
            />
            <div>
              <span className="dosis">
                {this.state.search &&
                  this.state.search !== "" && (
                    <span>
                      <strong>{filteredCards.length}</strong>&nbsp;&nbsp;matching
                    </span>
                  )}
              </span>
            </div>
          </div>
          <div className={`${styles.sort} dosis`}>
            <span>Sort by</span>
            <a
              onClick={() => this.handleChangeSort(DeckView.sorts.created)}
              role="presentation"
              className={classnames({
                [styles.selected]: this.state.sort === DeckView.sorts.created
              })}
            >
              Last created
            </a>&nbsp;
            <a
              onClick={() => this.handleChangeSort(DeckView.sorts.edited)}
              role="presentation"
              className={classnames({
                [styles.selected]: this.state.sort === DeckView.sorts.edited
              })}
            >
              Last edited
            </a>&nbsp;
            <a
              onClick={() => this.handleChangeSort(DeckView.sorts.unanswered)}
              role="presentation"
              className={classnames({
                [styles.selected]: this.state.sort === DeckView.sorts.unanswered
              })}
            >
              Unanswered
            </a>
          </div>
          <div className={`${styles.arrange} dosis`}>
            <span>Arrangement</span>
            <a
              onClick={() =>
                this.handleChangeArrangement(DeckView.arrangements.two)
              }
              role="presentation"
              className={classnames({
                [styles.selected]:
                  this.state.arrangement === DeckView.arrangements.two
              })}
            >
              Two columns
            </a>&nbsp;
            <a
              onClick={() =>
                this.handleChangeArrangement(DeckView.arrangements.three)
              }
              role="presentation"
              className={classnames({
                [styles.selected]:
                  this.state.arrangement === DeckView.arrangements.three
              })}
            >
              Three columns
            </a>&nbsp;
            {/*
            <a
              onClick={() =>
                this.handleChangeArrangement(DeckView.arrangements.list)}
              role="presentation"
            >
              List
            </a>
             */}
          </div>
        </div>

        <div className={`wrap-row ${styles.grid} ${gridClassName}`}>
          {filteredCards.map((c, i) => (
            <Card
              card={c}
              key={`card_${deck.id}__${c.index}`}
              className={`${styles["card-contents"]}`}
              trimOverflow
            >
              {
                // TODO: Break this into an Overlay component and use on Card
                // and Deck
              }
              <Overlay>
                <OverlayRow>
                  <button
                    className="button"
                    onClick={() => this.handleCardView(deck.id, i)}
                  >
                    View
                  </button>
                  <button
                    className="button"
                    onClick={() => this.handleCardEdit(deck.id, i)}
                  >
                    Edit
                  </button>
                  <button
                    className="button btn-delete"
                    onClick={() => this.handleCardDelete(deck.id, i)}
                  >
                    Delete
                  </button>
                </OverlayRow>
                <OverlayRow>
                  <button
                    className="button"
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
          ))}
          {this.renderEmpty(deck.cards.length)}
        </div>
      </section>
    );
  }
}

export default DeckView;
