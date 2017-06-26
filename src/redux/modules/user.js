// import axios from 'axios'
import firebase from '../../firebase'
import { fetchUserDecks } from './decks'
import { createReducer } from '../../utils'

/**
 * Actions
 */
const AUTHENTICATION_COMPLETE = 'user/AUTHENTICATION_COMPLETE'
const START_AUTH = 'user/START_AUTH'
const STOP_AUTH = 'user/STOP_AUTH'
const REGISTER = 'user/REGISTER'
const LOGIN = 'user/LOGIN'
const LOGOUT = 'user/LOGOUT'

/**
 * Reducers
 */
const reducers = {
  register: (state, action) => ({
    ...state,
    username: action.username,
    authenticated: false
  }),
  login: (state, action) => ({
    ...state,
    username: action.username,
    token: action.token,
    authenticated: true,
    isAuthenticating: false
  }),
  logout: (state, action) => ({
    username: null,
    token: null,
    authenticated: false,
    isAuthenticating: false
  }),
  authenticationComplete: (state, action) => ({
    ...state
    // TODO: Fill in later
  }),
  startAuthenticating: (state, action) => ({
    ...state,
    isAuthenticating: true
  }),
  stopAuthenticating: (state, action) => ({
    ...state,
    isAuthenticating: false
  })
}

const handlers = {
  [REGISTER]: reducers.register,
  [LOGIN]: reducers.login,
  [LOGOUT]: reducers.logout,
  [AUTHENTICATION_COMPLETE]: reducers.authenticationComplete,
  [START_AUTH]: reducers.startAuthenticating,
  [STOP_AUTH]: reducers.stopAuthenticating
}

export default createReducer({}, handlers)

/**
 * Action Creators
 */
export const authenticationComplete = () => ({
  type: AUTHENTICATION_COMPLETE
})
export const startAuthenticating = () => ({
  type: START_AUTH
})
export const stopAuthenticating = () => ({
  type: STOP_AUTH
})
export function register (username, password) {
  return { type: REGISTER, username, password }
}

export function loginUser (username, password, token) {
  return { type: LOGIN, username, password, token }
}

export function logoutUser (username) {
  return { type: LOGOUT, username }
}

/**
 * Side Effects
 */
export const logout = username =>
  (dispatch) => {
    dispatch(logoutUser(username))
  }

export const signupEmail = (username, password) =>
  (dispatch) => {
    // Disable the login/signup buttons while we're authenticating with Firebase
    dispatch(startAuthenticating())

    return firebase.auth()
      .createUserWithEmailAndPassword(username, password)
      .then((e) => {
        dispatch(login(username, password))
      })
      .catch((err) => {
        dispatch(stopAuthenticating())
        let message
        if (err.code === 'auth/email-already-in-use') {
          message = 'Email already in use'
        } if (err.code === 'auth/weak-password') {
          message = 'The password is too weak'
        } if (err.code === 'auth/invalid-email') {
          message = 'Invalid email'
        } if (err.code === 'auth/operation-not-allowed') {
          message = 'Email not allowed'
        } else {
          message = err.message
        }
        console.log('Signup error', err, 'username', username, 'password', password)

        return message
      })
  }

export const login = (username, password) =>
  (dispatch) => {
    // Disable the login/signup buttons while we're authenticating with Firebase
    dispatch(startAuthenticating())

    return firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .then((e) => {
        dispatch(loginUser(username, password, e.uid))
        dispatch(fetchUserDecks())
      })
      .catch((err) => {
        dispatch(stopAuthenticating())
        let message
        if (err.code === 'auth/invalid-email' ||
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password') {
          message = 'Invalid username or password'
        } else {
          message = err.message
        }

        console.log('Login error', err, 'username', username, 'password', password)
        return message
      })
  }
