/* @flow */
import moment from 'moment'
import firebase from '../../firebase'
import { createReducer, findBestNextIndex, generateRandomString } from '../../utils'
import samples from '../../data/samples'
import type { State as AppState } from '../index.js'

/**
 * Actions
 */
const ADD_CARD = 'decks/ADD_CARD'
const DUPLICATE_CARD = 'decks/DUPLICATE_CARD'
const EDIT_CARD = 'decks/EDIT_CARD'
const MOVE_CARD = 'decks/MOVE_CARD'
const REMOVE_CARD = 'decks/REMOVE_CARD'
const ADD_DECK = 'decks/ADD_DECK'
const EDIT_DECK = 'decks/EDIT_DECK'
const REMOVE_DECK = 'decks/REMOVE_DECK'
const SHUFFLE_DECK = 'decks/SHUFFLE_DECK'
const LOAD_DECKS = 'decks/LOAD_DECKS'
const REMOVE_ALL_DECKS = 'decks/REMOVE_ALL_DECKS'

export type Card = {|
  title: string,
  answer: string,
  index: number,
|}

export type Deck = {|
  id: string,
  title: string,
  description: string,
  cards: Array<Card>,
|}

export type State = Array<Deck>
const initialState: State = []

/**
 * Reducers
 */
const reducers = {
  addCard: (state: State, { deckId, title, answer, createdOn }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) {
      return state
    }
    const deck = state[deckIndex]
    const newCard = {
      title,
      answer,
      index: findBestNextIndex(deck.cards, 'index'),
      createdOn,
      editedOn: null,
    }

    const newDeck = {
      ...deck,
      cards: [...deck.cards, newCard],
    }

    return [...state.slice(0, deckIndex), newDeck, ...state.slice(deckIndex + 1)]
  },

  duplicateCard: (state: State, { deckId, cardIndex, createdOn }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) {
      return state
    }
    const adjCardIndex = parseInt(cardIndex, 10) - 1
    const deck = state[deckIndex]
    const newCard = {
      ...deck.cards[adjCardIndex],
      index: findBestNextIndex(deck.cards, 'index'),
      createdOn,
      editedOn: null,
    }
    const newDeck = {
      ...deck,
      cards: [...deck.cards, newCard],
    }

    return [...state.slice(0, deckIndex), newDeck, ...state.slice(deckIndex + 1)]
  },

  editCard: (state: State, { deckId, cardIndex, title, answer, editedOn }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) {
      return state
    }
    // The card index coming in isn't 0-based and also a string, so convert
    const adjCardIndex = parseInt(cardIndex, 10) - 1
    const deck = { ...state[deckIndex] }
    const newCard = {
      ...deck.cards[adjCardIndex],
      title,
      answer,
      editedOn,
    }

    const newDeck = {
      ...deck,
      cards: [...deck.cards.slice(0, adjCardIndex), newCard, ...deck.cards.slice(adjCardIndex + 1)],
    }

    return [...state.slice(0, deckIndex), newDeck, ...state.slice(deckIndex + 1)]
  },

  moveCard: (state: State, { srcDeckId, destDeckId, cardIndex }) => {
    // TODO: Is it possible to call another action from one action?
    // Yes, though redux-thunk
    const srcDeckIndex = state.findIndex(v => v.id === srcDeckId)
    const destDeckIndex = state.findIndex(v => v.id === destDeckId)

    const srcDeck = Object.assign({}, state[srcDeckIndex])
    const destDeck = Object.assign({}, state[destDeckIndex])

    const targetCardFilter = srcDeck.cards.filter(x => x.index === cardIndex)
    const targetCard = targetCardFilter.length === 0 ? null : targetCardFilter[0]
    const targetCardIndex = srcDeck.cards.indexOf(targetCard)

    // Remove from the source deck
    srcDeck.cards = [
      ...srcDeck.cards.slice(0, targetCardIndex),
      ...srcDeck.cards.slice(targetCardIndex + 1),
    ]

    // Add to the destination deck
    destDeck.cards = [...destDeck.cards, targetCard]

    if (srcDeckIndex < destDeckIndex) {
      return [
        ...state.slice(0, srcDeckIndex),
        srcDeck,
        ...state.slice(srcDeckIndex + 1, destDeckIndex),
        destDeck,
        ...state.slice(destDeckIndex + 1),
      ]
    }
    return [
      ...state.slice(0, destDeckIndex),
      destDeck,
      ...state.slice(destDeckIndex + 1, srcDeckIndex),
      srcDeck,
      ...state.slice(srcDeckIndex + 1),
    ]
  },

  removeCard: (state: State, { deckId, cardIndex }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)

    // The card index coming in isn't 0-based and also a string, so convert
    const adjCardIndex = parseInt(cardIndex, 10) - 1
    const deck = state[deckIndex]
    const newDeck = {
      ...deck,
      cards: [...deck.cards.slice(0, adjCardIndex), ...deck.cards.slice(adjCardIndex + 1)],
    }

    return [...state.slice(0, deckIndex), newDeck, ...state.slice(deckIndex + 1)]
  },

  addDeck: (state: State, { deck }) => [...state, Object.assign({}, deck)],

  editDeck: (state: State, { deckId, title, description }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) {
      return state
    }
    const deck = { ...state[deckIndex] }
    deck.title = title
    deck.description = description
    return [...state.slice(0, deckIndex), deck, ...state.slice(deckIndex + 1)]
  },

  removeDeck: (state: State, { deckId }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) {
      return state
    }
    return [...state.slice(0, deckIndex), ...state.slice(deckIndex + 1)]
  },

  // Should this really be an action?
  shuffleDeck: (state: State) => state,

  removeAllDecks: () => [],
  loadDecks: (state: State, action) => action.decks,
}

const reducerHandlers = {
  [ADD_CARD]: reducers.addCard,
  [DUPLICATE_CARD]: reducers.duplicateCard,
  [EDIT_CARD]: reducers.editCard,
  [MOVE_CARD]: reducers.moveCard,
  [REMOVE_CARD]: reducers.removeCard,
  [ADD_DECK]: reducers.addDeck,
  [EDIT_DECK]: reducers.editDeck,
  [REMOVE_DECK]: reducers.removeDeck,
  [SHUFFLE_DECK]: reducers.shuffleDeck,
  [REMOVE_ALL_DECKS]: reducers.removeAllDecks,
  [LOAD_DECKS]: reducers.loadDecks,
}
export default createReducer(initialState, reducerHandlers)

/**
 * Action Creators
 */
export const addDeck = (deck: Deck, preventSave: boolean = false) => ({
  type: ADD_DECK,
  deck,
  preventSave,
})
export const editDeck = (deckId: string, title: string, description: string) => ({
  type: EDIT_DECK,
  deckId,
  title,
  description,
})
export const removeDeck = (deckId: string) => ({
  type: REMOVE_DECK,
  deckId,
})
export const shuffleDeck = (deckId: string) => ({
  type: SHUFFLE_DECK,
  deckId,
})
export const addCard = (
  title: string,
  answer: string,
  deckId: string,
  createdOn: string = moment().format()
) => ({
  type: ADD_CARD,
  title,
  answer,
  deckId,
  createdOn,
})
export const duplicateCard = (
  cardIndex: number,
  deckId: string,
  createdOn: string = moment().format()
) => ({
  type: DUPLICATE_CARD,
  cardIndex,
  deckId,
  createdOn,
})
export const editCard = (
  title: string,
  answer: string,
  cardIndex: number,
  deckId: string,
  editedOn: string = moment().format()
) => ({
  type: EDIT_CARD,
  title,
  answer,
  cardIndex,
  deckId,
  editedOn,
})
export const moveCard = (cardIndex: number, srcDeckId: string, destDeckId: string) => ({
  type: MOVE_CARD,
  cardIndex,
  srcDeckId,
  destDeckId,
})
export const removeCard = (cardIndex: number, deckId: string) => ({
  type: REMOVE_CARD,
  cardIndex,
  deckId,
})
export const removeAllDecks = () => ({
  type: REMOVE_ALL_DECKS,
})
export const loadDecks = (decks: Array<Deck>) => ({
  type: LOAD_DECKS,
  decks,
})

/**
 * Side Effects
 */
export const fetchUserDecks = () => (dispatch: *, getState: () => AppState) => {
  const state = getState()
  // const deckExists = deckId =>
  //   state.decks.filter(v => v.id === deckId).length > 0

  return firebase
    .database()
    .ref(`decks/${state.user.uid}`)
    .on('value', decks => {
      const deckArray = []
      decks.forEach(deck => {
        const val = deck.val()
        // Bug where Firebase does not save properties with empty arrays, so
        // we'll have to rebuild it when we receive a deck like that
        if (!val.cards) {
          val.cards = []
        }
        // // Only load the deck from Firebase if it doesn't already exist
        // if (!deckExists(val.id)) {
        //   dispatch(addDeck(val))
        //   decksLoaded++
        // } else {
        //   decksDuplicate++
        // }
        deckArray.push(val)
      })
      dispatch(loadDecks(deckArray))
    })
}

export const saveDecksToFirebase = () => (dispatch: *, getState: () => AppState) => {
  const state = getState()
  const authenticated = state.user.authenticated
  const promises = []
  if (authenticated) {
    for (let d = 0; d < state.decks.length; d++) {
      promises.push(
        firebase
          .database()
          .ref(`decks/${state.user.uid}/${state.decks[d].id}`)
          .set(state.decks[d])
      )
    }
  }
  return Promise.all(promises)
}

export const deleteDeckFromFirebase = (deckId: string) => (
  dispatch: *,
  getState: () => AppState
) => {
  const state = getState()
  const authenticated = state.user.authenticated

  if (authenticated) {
    return firebase
      .database()
      .ref(`decks/${state.user.uid}/${deckId}`)
      .remove()
  }

  return Promise.resolve()
}

export const loadSampleDecks = () => (dispatch: *) => {
  let sampleDeck
  samples.forEach(deck => {
    sampleDeck = { ...deck }
    // Create a new ID for the new samples
    sampleDeck.id = generateRandomString()
    // When we add sample decks, prevent saving after each deck is added with
    // the second argument set to true. This causes a delay.
    dispatch(addDeck(sampleDeck, true))
    // Intead, we'll invoke the save automatically
    dispatch(saveDecksToFirebase())
  })
}

// TODO: Eventually we want to make a call to Firebase on card add/delete/move
// and deck add/delete/move

/**
 * Action Listeners
 */

type SaveDecksAction = { type: string, preventSave: boolean }
type DeleteDeckAction = { type: string, deckId: string }
export type Action = SaveDecksAction | DeleteDeckAction

// Ensure that we dispatch the save to firebase action after these actions
const saveDecks = (action: SaveDecksAction, dispatch: *) => {
  if (!action.preventSave) {
    dispatch(saveDecksToFirebase())
  }
}

const deleteDeck = (action: DeleteDeckAction, dispatch: *) => {
  dispatch(deleteDeckFromFirebase(action.deckId))
}

export const listeners = {
  [ADD_CARD]: saveDecks,
  [ADD_DECK]: saveDecks,
  [EDIT_DECK]: saveDecks,
  [REMOVE_DECK]: deleteDeck,
  [DUPLICATE_CARD]: saveDecks,
  [REMOVE_CARD]: saveDecks,
  [EDIT_CARD]: saveDecks,
}
