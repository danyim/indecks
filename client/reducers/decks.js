// a reducer takes in two things:
//  1. the action (info about what happened)
//  2. copy of the current state

function decks(state = [], action) {
  let deckIndex;
  switch(action.type) {
    case 'ADD_CARD':
      return state;
    case 'EDIT_CARD':
      deckIndex = state.findIndex(v => v.id === action.deckId);
      // console.log('editing card', state, action, card, 'deckindex', deckIndex);
      // The card index coming in isn't 0-based and also a string, so convert
      const adjCardIndex = parseInt(action.cardIndex) - 1;
      const deck = state[deckIndex];
      const newCard = Object.assign({}, deck.cards[adjCardIndex]);
      newCard.title = action.title;
      newCard.answer = action.answer;

      const newDeck = {
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

      // return state;
    case 'REMOVE_CARD':
      return state;
    case 'ADD_DECK':
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
