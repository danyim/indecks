const toggleShuffle = (state, action) => {
  const newState = { ...state };
  newState.shuffle = !newState.shuffle;
  return newState;
}

function config(state = [], action) {
  switch(action.type) {
    case 'TOGGLE_SHUFFLE':
      return toggleShuffle(state, action);
    default:
      return state;
  }
}

export default config;
