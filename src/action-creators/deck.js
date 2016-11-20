import * as types from '../actions';

export function addDeck(deck) {
  return {
    type: types.ADD_DECK,
    deck
  };
}
export function editDeck(deckId, title, description) {
  return {
    type: types.EDIT_DECK,
    deckId,
    title,
    description
  };
}

export function removeDeck(deckId) {
  return {
    type: types.REMOVE_DECK,
    deckId
  };
}

export function shuffleDeck(deckId) {
  return {
    type: types.SHUFFLE_DECK,
    deckId
  };
}


export function addCard(title, answer, deckId) {
  return {
    type: types.ADD_CARD,
    title,
    answer,
    deckId
  };
}

export function duplicateCard(cardIndex, deckId) {
  return {
    type: types.DUPLICATE_CARD,
    cardIndex,
    deckId
  };
}

export function editCard(title, answer, cardIndex, deckId) {
  return {
    type: types.EDIT_CARD,
    title,
    answer,
    cardIndex,
    deckId
  };
}

export function moveCard(cardIndex, sourceDeckId, destDeckId) {
  return {
    type: types.MOVE_CARD,
    cardIndex,
    sourceDeckId,
    destDeckId
  };
}

export function removeCard(cardIndex, deckId) {
  return {
    type: types.REMOVE_CARD,
    cardIndex,
    deckId
  };
}

export function removeAllDecks() {
  return {
    type: types.REMOVE_ALL_DECKS
  };
}
