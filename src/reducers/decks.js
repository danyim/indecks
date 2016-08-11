import { ADD_CARD, EDIT_CARD, REMOVE_CARD, ADD_DECK, REMOVE_DECK, SHUFFLE_DECK } from '../actions';
import { createReducer } from '../utils';

const addCard = (state, {deckId, title, answer}) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if(deckIndex === -1) return state;
  deck = state[deckIndex];
  newCard = {
    title: title,
    answer: answer
  };
  const cards = [...deck.cards];
  cards.push(newCard);

  newDeck = {
    ...deck,
    cards: cards
  };

  return [
    ...state.slice(0, deckIndex),
    newDeck,
    ...state.slice(deckIndex + 1),
  ];
};

const editCard = (state, {deckId, cardIndex, title, answer}) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if(deckIndex === -1) return state;
  // The card index coming in isn't 0-based and also a string, so convert
  const adjCardIndex = parseInt(cardIndex) - 1;
  const deck = state[deckIndex];
  const newCard = Object.assign({}, deck.cards[adjCardIndex]);
  newCard.title = title;
  newCard.answer = answer;

  newDeck = {
    ...deck,
    cards: [
      ...deck.cards.slice(0, adjCardIndex),
      newCard,
      ...deck.cards.slice(adjCardIndex + 1)
    ]
  };

  return [
    ...state.slice(0, deckIndex),
    newDeck,
    ...state.slice(deckIndex + 1),
  ];
};

const removeCard = (state, {deckId, cardIndex}) => {
  const deckIndex = state.findIndex(v => v.id === deckId);

  // The card index coming in isn't 0-based and also a string, so convert
  const adjCardIndex = parseInt(cardIndex) - 1;
  const deck = state[deckIndex];
  const newDeck = {
    ...deck,
    cards: [
      ...deck.cards.slice(0, adjCardIndex),
      ...deck.cards.slice(adjCardIndex + 1)
    ]
  };

  return [
    ...state.slice(0, deckIndex),
    newDeck,
    ...state.slice(deckIndex + 1),
  ];
};

const addDeck = (state, {deck}) => {
  return [
    ...state,
    Object.assign({}, deck)
  ];
};

const removeDeck = (state, {deckId}) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if(deckIndex === -1) return state;
  return [
    ...state.slice(0, deckIndex),
    ...state.slice(deckIndex + 1),
  ];
};

const shuffleDeck = (state) => state;

const handlers = {
  [ADD_CARD]: addCard,
  [EDIT_CARD]: editCard,
  [REMOVE_CARD]: removeCard,
  [ADD_DECK]: addDeck,
  [REMOVE_DECK]: removeDeck,
  [SHUFFLE_DECK]: shuffleDeck
};

export default createReducer({}, handlers);
