import firebase from '../../firebase'
import {
  createReducer,
  findBestNextIndex,
  generateRandomString
} from '../../utils'
import samples from '../../data/samples'

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

/**
 * Reducers
 */
const reducers = {
  addCard: (state, { deckId, title, answer }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) return state
    const deck = state[deckIndex]
    const newCard = {
      title,
      answer,
      index: findBestNextIndex(deck.cards, 'index')
    }

    const newDeck = {
      ...deck,
      cards: [...deck.cards, newCard]
    }

    return [
      ...state.slice(0, deckIndex),
      newDeck,
      ...state.slice(deckIndex + 1)
    ]
  },

  duplicateCard: (state, { deckId, cardIndex }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) return state
    const adjCardIndex = parseInt(cardIndex, 10) - 1
    const deck = state[deckIndex]
    const newCard = Object.assign({}, deck.cards[adjCardIndex])
    newCard.index = findBestNextIndex(deck.cards, 'index')
    const newDeck = {
      ...deck,
      cards: [...deck.cards, newCard]
    }

    return [
      ...state.slice(0, deckIndex),
      newDeck,
      ...state.slice(deckIndex + 1)
    ]
  },

  editCard: (state, { deckId, cardIndex, title, answer }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) return state
    // The card index coming in isn't 0-based and also a string, so convert
    const adjCardIndex = parseInt(cardIndex, 10) - 1
    const deck = { ...state[deckIndex] }
    const newCard = Object.assign({}, deck.cards[adjCardIndex])
    newCard.title = title
    newCard.answer = answer

    const newDeck = {
      ...deck,
      cards: [
        ...deck.cards.slice(0, adjCardIndex),
        newCard,
        ...deck.cards.slice(adjCardIndex + 1)
      ]
    }

    return [
      ...state.slice(0, deckIndex),
      newDeck,
      ...state.slice(deckIndex + 1)
    ]
  },

  moveCard: (state, { srcDeckId, destDeckId, cardIndex }) => {
    // TODO: Is it possible to call another action from one action?
    // Yes, though redux-thunk
    const srcDeckIndex = state.findIndex(v => v.id === srcDeckId)
    const destDeckIndex = state.findIndex(v => v.id === destDeckId)

    const srcDeck = Object.assign({}, state[srcDeckIndex])
    const destDeck = Object.assign({}, state[destDeckIndex])

    const targetCardFilter = srcDeck.cards.filter(x => x.index === cardIndex)
    const targetCard =
      targetCardFilter.length === 0 ? null : targetCardFilter[0]
    const targetCardIndex = srcDeck.cards.indexOf(targetCard)

    // Remove from the source deck
    srcDeck.cards = [
      ...srcDeck.cards.slice(0, targetCardIndex),
      ...srcDeck.cards.slice(targetCardIndex + 1)
    ]

    // Add to the destination deck
    destDeck.cards = [...destDeck.cards, targetCard]

    if (srcDeckIndex < destDeckIndex) {
      return [
        ...state.slice(0, srcDeckIndex),
        srcDeck,
        ...state.slice(srcDeckIndex + 1, destDeckIndex),
        destDeck,
        ...state.slice(destDeckIndex + 1)
      ]
    }
    return [
      ...state.slice(0, destDeckIndex),
      destDeck,
      ...state.slice(destDeckIndex + 1, srcDeckIndex),
      srcDeck,
      ...state.slice(srcDeckIndex + 1)
    ]
  },

  removeCard: (state, { deckId, cardIndex }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)

    // The card index coming in isn't 0-based and also a string, so convert
    const adjCardIndex = parseInt(cardIndex, 10) - 1
    const deck = state[deckIndex]
    const newDeck = {
      ...deck,
      cards: [
        ...deck.cards.slice(0, adjCardIndex),
        ...deck.cards.slice(adjCardIndex + 1)
      ]
    }

    return [
      ...state.slice(0, deckIndex),
      newDeck,
      ...state.slice(deckIndex + 1)
    ]
  },

  addDeck: (state, { deck }) => [...state, Object.assign({}, deck)],

  editDeck: (state, { deckId, title, description }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) return state
    const deck = { ...state[deckIndex] }
    deck.title = title
    deck.description = description
    return [...state.slice(0, deckIndex), deck, ...state.slice(deckIndex + 1)]
  },

  removeDeck: (state, { deckId }) => {
    const deckIndex = state.findIndex(v => v.id === deckId)
    if (deckIndex === -1) return state
    return [...state.slice(0, deckIndex), ...state.slice(deckIndex + 1)]
  },

  // Should this really be an action?
  shuffleDeck: state => state,

  removeAllDecks: () => [],
  loadDecks: (state, action) => action.decks
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
  [LOAD_DECKS]: reducers.loadDecks
}
export default createReducer({}, reducerHandlers)

/**
 * Action Creators
 */
export const addDeck = deck => ({
  type: ADD_DECK,
  deck
})
export const editDeck = (deckId, title, description) => ({
  type: EDIT_DECK,
  deckId,
  title,
  description
})
export const removeDeck = deckId => ({
  type: REMOVE_DECK,
  deckId
})
export const shuffleDeck = deckId => ({
  type: SHUFFLE_DECK,
  deckId
})
export const addCard = (title, answer, deckId) => ({
  type: ADD_CARD,
  title,
  answer,
  deckId
})
export const duplicateCard = (cardIndex, deckId) => ({
  type: DUPLICATE_CARD,
  cardIndex,
  deckId
})
export const editCard = (title, answer, cardIndex, deckId) => ({
  type: EDIT_CARD,
  title,
  answer,
  cardIndex,
  deckId
})
export const moveCard = (cardIndex, srcDeckId, destDeckId) => ({
  type: MOVE_CARD,
  cardIndex,
  srcDeckId,
  destDeckId
})
export const removeCard = (cardIndex, deckId) => ({
  type: REMOVE_CARD,
  cardIndex,
  deckId
})
export const removeAllDecks = () => ({
  type: REMOVE_ALL_DECKS
})
export const loadDecks = decks => ({
  type: LOAD_DECKS,
  decks
})

/**
 * Side Effects
 */
export const fetchUserDecks = () => (dispatch, getState) => {
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

export const saveDecksToFirebase = () => (dispatch, getState) => {
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
    console.log(`saved ${promises.length} decks`)
  }
  return Promise.all(promises)
}

export const loadSampleDecks = () => dispatch => {
  let sampleDeck
  samples.forEach(d => {
    sampleDeck = { ...d }
    // Create a new ID for the new samples
    sampleDeck.id = generateRandomString()
    dispatch(addDeck(sampleDeck))
  })
}

// Unused
export const saveCardToFirebase = (cardIndex, deckId) => (
  dispatch,
  getState
) => {
  const state = getState()
  const authenticated = state.user.authenticated
  if (authenticated) {
    return firebase
      .database()
      .ref(`decks/${state.user.uid}/${deckId}/cards/${cardIndex}`)
      .set(state.decks[deckId].cards[cardIndex])
  }
  return Promise.resolve()
}

// TODO: Eventually we want to make a call to Firebase on card add/delete/move
// and deck add/delete/move

/**
 * Sagas
 */
// function * saveDecksToFirebaseSaga (dispatch) {
//   debugger
//   yield put(saveDecksToFirebase)
// }

// function * addCardSaga () {
//   yield takeEvery('decks/ADD_CARD', saveDecksToFirebaseSaga)
// }

// export function * sagas () {
//   yield all([
//     addCardSaga()
//   ])
// }

/**
 * Action Listeners
 */
// Ensure that we dispatch the save to firebase action after these actions
const saveDecks = (action, dispatch /* state */) => {
  dispatch(saveDecksToFirebase())
}

export const listeners = {
  [ADD_CARD]: saveDecks,
  [ADD_DECK]: saveDecks,
  [EDIT_DECK]: saveDecks,
  [DUPLICATE_CARD]: saveDecks,
  [REMOVE_CARD]: saveDecks,
  [EDIT_CARD]: saveDecks
}
