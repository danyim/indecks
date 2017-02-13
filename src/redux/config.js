import { TOGGLE_SHUFFLE } from '../actions';
import { createReducer } from '../utils';

const toggleShuffle = (state, action) => {
  const newState = { ...state };
  newState.shuffle = !newState.shuffle;
  return newState;
};

const handlers = {
  [TOGGLE_SHUFFLE]: toggleShuffle
};

export default createReducer({}, handlers);
