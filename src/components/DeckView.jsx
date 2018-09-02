/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { RIEInput, RIETextArea } from '@attently/riek'
import { Link } from 'react-router-dom'
import slug from 'slug'
import classnames from 'classnames'
import { DeckShape } from './__commonShapes'
import Card from './Card'
import ExportDeckButton from './ExportDeckButton'
import Overlay from './Overlay'
import OverlayRow from './OverlayRow'
import ModalHelpButton from './ModalHelpButton'
import { VIEW_STYLES, SORT_TYPES } from 'indecks/constants'
import type { Deck } from 'indecks/redux/modules/decks'
import styles from '../styles/components/DeckView.styl'

type Props = {
  deck: Deck,
  maxDeckTitleLength: number,
  maxDeckDescLength: number,
  handleDuplicateCard: *,
  handleEditDeck: *,
  handleRemoveCard: *,
  handleRemoveDeck: *,
  push: *,
}

type State = {
  arrangement: $Keys<typeof VIEW_STYLES>,
  sort: $Keys<typeof SORT_TYPES>,
  search: ?string,
}

class DeckView extends React.Component<Props, State> {
  static propTypes = {
    deck: DeckShape.isRequired,
    maxDeckTitleLength: PropTypes.number,
    maxDeckDescLength: PropTypes.number,
    handleDuplicateCard: PropTypes.func.isRequired,
    handleEditDeck: PropTypes.func.isRequired,
    handleRemoveCard: PropTypes.func.isRequired,
    handleRemoveDeck: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
    maxDeckTitleLength: 160,
    maxDeckDescLength: 300,
  }

  static contextTypes = {
    router: PropTypes.object,
  }
  state = {
    arrangement: VIEW_STYLES.TWO_COL,
    sort: SORT_TYPES.CREATED,
    search: null,
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

  handleExport = () => {
    const sanitizedDeck = {
      ...this.props.deck,
      cards: this.props.deck.cards.map(c => ({
        index: c.index,
        title: c.title,
        answer: c.answer,
      })),
    }

    return JSON.stringify(sanitizedDeck, null, 2)
  }

  handleCardView = (deckId: string, i: number) => {
    this.props.push(`/view/${deckId}/${i + 1}`)
  }

  handleCardDuplicate = (deckId: string, i: number) => {
    this.props.handleDuplicateCard(
      i + 1, // expects a cardIndex, which is 1-based
      deckId
    )
  }

  // handleCardMove(deckId, i) {
  //   // TODO: Some implementation here
  // }

  handleCardEdit = (deckId: string, i: number) => {
    this.props.push(`/edit/${deckId}/${i + 1}`)
  }

  handleCardDelete = (deckId: string, i: number) => {
    if (window.confirm('Are you sure?')) {
      this.props.handleRemoveCard(
        i + 1, // expects a cardIndex, which is 1-based
        deckId
      )
      this.props.push(`/view/${deckId}`)
    }
  }

  handleEditDeckDetails = (data: Deck) => {
    this.props.handleEditDeck(
      this.props.deck.id,
      data.title ? data.title : this.props.deck.title,
      data.description ? data.description : this.props.deck.description
    )
  }

  handleChangeArrangement = (arrangement: $Keys<typeof VIEW_STYLES>) => {
    this.setState({ arrangement })
    // if(arrangement === VIEW_STYLES.TWO_COL) {
    //   this.setState({ arrangement: })
    // } else if(arrangement === VIEW_STYLES.THREE_COL) {

    // } else if(arrangement === VIEW_STYLES.LIST) {

    // }
  }

  handleChangeSearch = (value: string) => {
    this.setState({
      search: value,
    })
  }

  handleChangeSort = (sort: $Keys<typeof SORT_TYPES>) => {
    this.setState({ sort })
  }

  validateDescription = (text: string): boolean => {
    return text.trim() !== '' && text.length > 0 && text.length <= this.props.maxDeckDescLength
  }

  validateTitle = (text: string): boolean => {
    return text.length > 0 && text.length <= this.props.maxDeckTitleLength
  }

  renderEmpty = (numCards: number) => {
    if (numCards === 0) {
      return <p className="center">Click the + button on the top left to add a card</p>
    }
    return null
  }

  render() {
    const { deck, maxDeckTitleLength, maxDeckDescLength } = this.props

    const gridClassName = classnames({
      'two-col': this.state.arrangement === VIEW_STYLES.TWO_COL,
      'three-col': this.state.arrangement === VIEW_STYLES.THREE_COL,
    })

    const filteredCards = deck.cards.filter(c => {
      const search = this.state.search
      if (search && search !== '') {
        return c.title.toLowerCase().includes(search.toLowerCase())
      }
      return true
    })

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
              maxLength={maxDeckTitleLength}
              validate={this.validateTitle}
              placeholder="Click here to add a title"
              classLoading="loading"
              classInvalid="invalid"
            />
            <p>
              <strong>{`${deck.cards.length} cards`}</strong>
              &nbsp;
              <ModalHelpButton style={{ minWidth: '350px' }}>
                <p>
                  Click anywhere on the deck&apos;s title or description to edit the field. Your
                  changes are saved immediately.
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
            />{' '}
          </div>
          <div className={`${styles['control-buttons']}`}>
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
            <button className="btn-delete" onClick={() => this.props.handleRemoveDeck(deck.id)}>
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
              <span>
                {this.state.search &&
                  this.state.search !== '' && (
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
              onClick={() => this.handleChangeSort(SORT_TYPES.CREATED)}
              role="presentation"
              className={classnames({
                [styles.selected]: this.state.sort === SORT_TYPES.CREATED,
              })}
            >
              Last created
            </a>&nbsp;
            <a
              onClick={() => this.handleChangeSort(SORT_TYPES.EDITED)}
              role="presentation"
              className={classnames({
                [styles.selected]: this.state.sort === SORT_TYPES.EDITED,
              })}
            >
              Last edited
            </a>&nbsp;
            <a
              onClick={() => this.handleChangeSort(SORT_TYPES.UNANSWERED)}
              role="presentation"
              className={classnames({
                [styles.selected]: this.state.sort === SORT_TYPES.UNANSWERED,
              })}
            >
              Unanswered
            </a>
          </div>
          <div className={`${styles.arrange}`}>
            {this.state.arrangement === VIEW_STYLES.TWO_COL && (
              <a
                onClick={() => this.handleChangeArrangement(VIEW_STYLES.THREE_COL)}
                role="presentation"
                className={classnames({
                  [styles.selected]: this.state.arrangement === VIEW_STYLES.TWO_COL,
                })}
              >
                Three columns
              </a>
            )}
            {this.state.arrangement === VIEW_STYLES.THREE_COL && (
              <a
                onClick={() => this.handleChangeArrangement(VIEW_STYLES.TWO_COL)}
                role="presentation"
                className={classnames({
                  [styles.selected]: this.state.arrangement === VIEW_STYLES.THREE_COL,
                })}
              >
                Two columns
              </a>
            )}
            {/*
            <a
              onClick={() =>
                this.handleChangeArrangement(VIEW_STYLES.LIST)}
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
              className={`${styles['card-contents']}`}
              trimOverflow
            >
              {
                // TODO: Break this into an Overlay component and use on Card
                // and Deck
              }
              <Overlay>
                <OverlayRow>
                  <button className="button" onClick={() => this.handleCardView(deck.id, i)}>
                    View
                  </button>
                  <button className="button" onClick={() => this.handleCardEdit(deck.id, i)}>
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
                  <button className="button" onClick={() => this.handleCardDuplicate(deck.id, i)}>
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
    )
  }
}

export default DeckView
