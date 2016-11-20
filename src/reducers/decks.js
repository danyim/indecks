import { ADD_CARD, DUPLICATE_CARD, EDIT_CARD, MOVE_CARD, REMOVE_CARD, ADD_DECK,
  EDIT_DECK, REMOVE_DECK, SHUFFLE_DECK, REMOVE_ALL_DECKS } from '../actions';
import { createReducer } from '../utils';

const addCard = (state, { deckId, title, answer }) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if (deckIndex === -1) return state;
  const deck = state[deckIndex];
  const newCard = {
    title,
    answer
  };

  const newDeck = {
    ...deck,
    cards: [...deck.cards, newCard]
  };

  return [
    ...state.slice(0, deckIndex),
    newDeck,
    ...state.slice(deckIndex + 1),
  ];
};

const duplicateCard = (state, { deckId, cardIndex }) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if (deckIndex === -1) return state;
  const adjCardIndex = parseInt(cardIndex, 10) - 1;
  const deck = state[deckIndex];
  const newCard = Object.assign({}, deck.cards[adjCardIndex]);

  const newDeck = {
    ...deck,
    cards: [...deck.cards, newCard]
  };

  return [
    ...state.slice(0, deckIndex),
    newDeck,
    ...state.slice(deckIndex + 1),
  ];
};

const editCard = (state, { deckId, cardIndex, title, answer }) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if (deckIndex === -1) return state;
  // The card index coming in isn't 0-based and also a string, so convert
  const adjCardIndex = parseInt(cardIndex, 10) - 1;
  const deck = { ...state[deckIndex] };
  const newCard = Object.assign({}, deck.cards[adjCardIndex]);
  newCard.title = title;
  newCard.answer = answer;

  const newDeck = {
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

const moveCard = (state, {sourceDeckId, destDeckId, cardIndex}) => {
  return state; // TODO: finish this implementation
};

const removeCard = (state, {deckId, cardIndex}) => {
  const deckIndex = state.findIndex(v => v.id === deckId);

  // The card index coming in isn't 0-based and also a string, so convert
  const adjCardIndex = parseInt(cardIndex, 10) - 1;
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

const addDeck = (state, { deck }) => {
  return [
    ...state,
    Object.assign({}, deck)
  ];
};

const editDeck = (state, { deckId, title, description }) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if (deckIndex === -1) return state;
  const deck = { ...state[deckIndex] };
  deck.title = title;
  deck.description = description;
  return [
    ...state.slice(0, deckIndex),
    deck,
    ...state.slice(deckIndex + 1),
  ];
};

const removeDeck = (state, { deckId }) => {
  const deckIndex = state.findIndex(v => v.id === deckId);
  if (deckIndex === -1) return state;
  return [
    ...state.slice(0, deckIndex),
    ...state.slice(deckIndex + 1),
  ];
};

const shuffleDeck = (state) => state;

const removeAllDecks = () => [];

const handlers = {
  [ADD_CARD]: addCard,
  [DUPLICATE_CARD]: duplicateCard,
  [EDIT_CARD]: editCard,
  [MOVE_CARD]: moveCard,
  [REMOVE_CARD]: removeCard,
  [ADD_DECK]: addDeck,
  [EDIT_DECK]: editDeck,
  [REMOVE_DECK]: removeDeck,
  [SHUFFLE_DECK]: shuffleDeck,
  [REMOVE_ALL_DECKS]: removeAllDecks
};

export default createReducer({}, handlers);
