// a reducer takes in two things:
//  1. the action (info about what happened)
//  2. copy of the current state

function decks(state = [], action) {
  switch(action.type) {
    case 'ADD_CARD':
      return state;
    case 'EDIT_CARD':
      console.log('editing card');
      return state;
    case 'REMOVE_CARD':
      return state;
    case 'ADD_DECK':
      return state;
    case 'REMOVE_DECK':
      const deckIndex = state.findIndex(v => v.id === action.deckId);

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
