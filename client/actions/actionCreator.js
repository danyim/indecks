import { pushState } from 'react-router-redux';
import * as types from './actionTypes';

export function addCard(card, deckId) {
  return {
    type: types.ADD_CARD,
    card,
    deckId
  }
}

export function editCard(title, answer, deckId) {
  return {
    type: types.EDIT_CARD,
    title,
    answer,
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

export function addDeck(title, url) {
  return {
    type: types.ADD_DECK,
    title,
    url
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
