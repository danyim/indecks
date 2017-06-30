import { createReducer } from '../../utils'

/**
 * Actions
 */
const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'

/**
 * Reducers
 */
const reducers = {
  toggleShuffle: state => {
    const newState = { ...state }
    newState.shuffle = !newState.shuffle
    return newState
  }
}

const handlers = {
  [TOGGLE_SHUFFLE]: reducers.toggleShuffle
}

export default createReducer({}, handlers)

/**
 * Action Creators
 */
export const toggleShuffle = () => ({
  type: TOGGLE_SHUFFLE
})

/**
 * Side Effects
 */
