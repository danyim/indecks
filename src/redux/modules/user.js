// import axios from 'axios'
import { createReducer } from '../../utils'

/**
 * Actions
 */
const AUTHENTICATION_COMPLETE = 'AUTHENTICATION_COMPLETE'
const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST'
const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED'

/**
 * Reducers
 */
const reducers = {
  authenticationComplete: (state, action) => state,
  authenticationRequest: (state, action) => state,
  authenticationFailed: (state, action) => state
}

const handlers = {
  [AUTHENTICATION_COMPLETE]: reducers.authenticationComplete,
  [AUTHENTICATION_REQUEST]: reducers.authenticationRequest,
  [AUTHENTICATION_FAILED]: reducers.authenticationFailed
}

export default createReducer({}, handlers)

/**
 * Action Creators
 */
export const authenticationComplete = () => ({
  type: AUTHENTICATION_COMPLETE
})
export const authenticationRequest = () => ({
  type: AUTHENTICATION_REQUEST
})
export const authenticationFailed = () => ({
  type: AUTHENTICATION_FAILED
})

/**
 * Side Effects
 */
export const authenticate = (username, password) =>
  (dispatch) => {
    dispatch(authenticationRequest)
    // Do something here...
    dispatch(authenticationComplete)
    dispatch(authenticationFailed)
  }
