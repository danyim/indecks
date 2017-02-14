import { createReducer, findMissing } from '../../utils';

/**
 * Actions
 */
const ADD_CARD = 'ADD_CARD';
const DUPLICATE_CARD = 'DUPLICATE_CARD';
const EDIT_CARD = 'EDIT_CARD';
const MOVE_CARD = 'MOVE_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const ADD_DECK = 'ADD_DECK';
const EDIT_DECK = 'EDIT_DECK';
const REMOVE_DECK = 'REMOVE_DECK';
const SHUFFLE_DECK = 'SHUFFLE_DECK';
const REMOVE_ALL_DECKS = 'REMOVE_ALL_DECKS';


/**
 * Reducers
 */
const reducers = {
  addCard: (state, { deckId, title, answer }) => {
    const deckIndex = state.findIndex(v => v.id === deckId);
    if (deckIndex === -1) return state;
    const deck = state[deckIndex];
    const newCard = {
      title,
      answer,
      index: findMissing(deck.cards.map(x => x.index)) || Math.max(0, Math.max.apply(null, deck.cards.map(x => x.index)) + 1)
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
  },

  duplicateCard: (state, { deckId, cardIndex }) => {
    const deckIndex = state.findIndex(v => v.id === deckId);
    if (deckIndex === -1) return state;
    const adjCardIndex = parseInt(cardIndex, 10) - 1;
    const deck = state[deckIndex];
    const newCard = Object.assign({}, deck.cards[adjCardIndex]);
    newCard.index = adjCardIndex + 1;
    const newDeck = {
      ...deck,
      cards: [...deck.cards, newCard]
    };

    return [
      ...state.slice(0, deckIndex),
      newDeck,
      ...state.slice(deckIndex + 1),
    ];
  },

  editCard: (state, { deckId, cardIndex, title, answer }) => {
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
  },

  moveCard: (state, {sourceDeckId, destDeckId, cardIndex}) => {
    return state; // TODO: finish this implementation
  },

  removeCard: (state, {deckId, cardIndex}) => {
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
  },

  addDeck: (state, { deck }) => {
    return [
      ...state,
      Object.assign({}, deck)
    ];
  },

  editDeck: (state, { deckId, title, description }) => {
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
  },

  removeDeck: (state, { deckId }) => {
    const deckIndex = state.findIndex(v => v.id === deckId);
    if (deckIndex === -1) return state;
    return [
      ...state.slice(0, deckIndex),
      ...state.slice(deckIndex + 1),
    ];
  },

  shuffleDeck: (state) => state,

  removeAllDecks: () => []
};

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
  [REMOVE_ALL_DECKS]: reducers.removeAllDecks
};
export default createReducer({}, reducerHandlers);


/**
 * Action Creators
 */
export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck
  };
};

export const editDeck = (deckId, title, description) => {
  return {
    type: EDIT_DECK,
    deckId,
    title,
    description
  };
}

export const removeDeck = (deckId) => {
  return {
    type: REMOVE_DECK,
    deckId
  };
};

export const shuffleDeck = (deckId) => {
  return {
    type: SHUFFLE_DECK,
    deckId
  };
};

export const addCard = (title, answer, deckId) => {
  return {
    type: ADD_CARD,
    title,
    answer,
    deckId
  };
};

export const duplicateCard = (cardIndex, deckId) => {
  return {
    type: DUPLICATE_CARD,
    cardIndex,
    deckId
  };
};

export const editCard = (title, answer, cardIndex, deckId) => {
  return {
    type: EDIT_CARD,
    title,
    answer,
    cardIndex,
    deckId
  };
};

export const moveCard = (cardIndex, sourceDeckId, destDeckId) => {
  return {
    type: MOVE_CARD,
    cardIndex,
    sourceDeckId,
    destDeckId
  };
};

export const removeCard = (cardIndex, deckId) => {
  return {
    type: REMOVE_CARD,
    cardIndex,
    deckId
  };
};

export const removeAllDecks = () => {
  return {
    type: REMOVE_ALL_DECKS
  };
};
