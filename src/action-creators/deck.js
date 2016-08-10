import * as types from '../actions';

export function addDeck(deck) {
  return {
    type: types.ADD_DECK,
    deck
  }
}

export function removeDeck(deckId) {
  return {
    type: types.REMOVE_DECK,
    deckId
  }
}

export function shuffleDeck(deckId) {
  return {
    type: types.SHUFFLE_DECK,
    deckId
  }
}

export function toggleShuffle() {
  return {
    type: types.TOGGLE_SHUFFLE
  }
}

