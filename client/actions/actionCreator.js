import { pushState } from 'react-router-redux';
import * as types from './actionTypes';

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

