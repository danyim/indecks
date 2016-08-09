// a reducer takes in two things:
//  1. the action (info about what happened)
//  2. copy of the current state

function decks(state = [], action) {
  let deckIndex, newCard, newDeck, deck, adjCardIndex
  switch(action.type) {
    case 'ADD_CARD':
      deckIndex = state.findIndex(v => v.id === action.deckId);
      if(deckIndex === -1) return state;
      deck = state[deckIndex];
      newCard = {
        title: action.title,
        answer: action.answer
      };
      const cards = [...deck.cards];
      cards.push(newCard);

      newDeck = {
        ...deck,
        cards: cards
      };

      return [
        ...state.splice(0, deckIndex),
        newDeck,
        ...state.splice(deckIndex + 1),
      ];
    case 'EDIT_CARD':
      deckIndex = state.findIndex(v => v.id === action.deckId);
      if(deckIndex === -1) return state;
      // console.log('editing card', state, action, card, 'deckindex', deckIndex);
      // The card index coming in isn't 0-based and also a string, so convert
      adjCardIndex = parseInt(action.cardIndex) - 1;
      deck = state[deckIndex];
      newCard = Object.assign({}, deck.cards[adjCardIndex]);
      newCard.title = action.title;
      newCard.answer = action.answer;

      newDeck = {
        ...deck,
        cards: [
          ...deck.cards.splice(0, adjCardIndex),
          newCard,
          ...deck.cards.splice(adjCardIndex + 1)
        ]
      };

      return [
        ...state.splice(0, deckIndex),
        newDeck,
        ...state.splice(deckIndex + 1),
      ];
    case 'REMOVE_CARD':
      deckIndex = state.findIndex(v => v.id === action.deckId);
      if(deckIndex === -1) return state;
      // The card index coming in isn't 0-based and also a string, so convert
      adjCardIndex = parseInt(action.cardIndex) - 1;
      deck = state[deckIndex];
      newDeck = {
        ...deck,
        cards: [
          ...deck.cards.splice(0, adjCardIndex),
          ...deck.cards.splice(adjCardIndex + 1)
        ]
      };

      return [
        ...state.splice(0, deckIndex),
        newDeck,
        ...state.splice(deckIndex + 1),
      ];
    case 'ADD_DECK':
      const jsonDeck = Object.assign({}, action.deck);
      return [
        ...state,
        jsonDeck
      ];
      return state;
    case 'REMOVE_DECK':
      deckIndex = state.findIndex(v => v.id === action.deckId);
      return [
        ...state.splice(0, deckIndex),
        ...state.splice(deckIndex + 1),
      ];
    case 'SHUFFLE_DECK':
      return state;
    default:
      return state;
  }
}

export default decks;
