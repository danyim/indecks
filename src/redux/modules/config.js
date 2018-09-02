/* @flow */
import { createReducer } from '../../utils'

/**
 * Actions
 */
const SHUFFLE_ON = 'config/SHUFFLE_ON'
const SHUFFLE_OFF = 'config/SHUFFLE_OFF'
const CHANGE_ACTIVE_MODAL = 'config/CHANGE_ACTIVE_MODAL'
const CLOSE_MODAL = 'config/CLOSE_MODAL'

export type State = {
  shuffle: boolean,
  currentModal: ?string,
}
const initialState: State = {
  shuffle: false,
  currentModal: null,
}

/**
 * Reducers
 */
const reducers = {
  shuffleOn: (state: State) => ({
    ...state,
    shuffle: true,
  }),
  shuffleOff: (state: State) => ({
    ...state,
    shuffle: false,
  }),
  changeActiveModal: (state: State, action) => ({
    ...state,
    currentModal: action.modalType,
  }),
  closeModal: (state: State) => ({
    ...state,
    currentModal: null,
  }),
}

const handlers = {
  [SHUFFLE_ON]: reducers.shuffleOn,
  [SHUFFLE_OFF]: reducers.shuffleOff,
  [CHANGE_ACTIVE_MODAL]: reducers.changeActiveModal,
  [CLOSE_MODAL]: reducers.closeModal,
}

export default createReducer(initialState, handlers)

/**
 * Action Creators
 */
export const shuffleOn = () => ({
  type: SHUFFLE_ON,
})
export const shuffleOff = () => ({
  type: SHUFFLE_OFF,
})
export const changeActiveModal = (modalType: string) => ({
  type: CHANGE_ACTIVE_MODAL,
  modalType,
})
export const closeModal = () => ({
  type: CLOSE_MODAL,
})

/**
 * Side Effects
 */
