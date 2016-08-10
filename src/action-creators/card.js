import * as types from '../actions';

export function addCard(title, answer, deckId) {
  return {
    type: types.ADD_CARD,
    title,
    answer,
    deckId
  }
}

export function editCard(title, answer, cardIndex, deckId) {
  return {
    type: types.EDIT_CARD,
    title,
    answer,
    cardIndex,
    deckId
  }
}

export function removeCard(cardIndex, deckId) {
  return {
    type: types.REMOVE_CARD,
    cardIndex,
    deckId
  }
}
