// import axios from 'axios'
import firebase, { auth } from '../../firebase'
import { fetchUserDecks, removeAllDecks } from './decks'
import { createReducer } from '../../utils'

const storageKey = 'FB_AUTH'

/**
 * Actions
 */
const USER_AUTH_SUCCESS = 'user/USER_AUTH_SUCCESS'
const USER_AUTH_REQUEST = 'user/USER_AUTH_REQUEST'
const USER_AUTH_COMPLETE = 'user/USER_AUTH_COMPLETE'
const USER_AUTH_FAIL = 'user/USER_AUTH_FAIL'
const REGISTER = 'user/REGISTER'
const LOGIN = 'user/LOGIN'
const LOGOUT = 'user/LOGOUT'
// const ENABLE_OFFLINE = 'user/ENABLE_OFFLINE'
// const DISABLE_OFFLINE = 'user/DISABLE_OFFLINE'
// const ENABLE_AUTOSAVE = 'user/ENABLE_AUTOSAVE'
// const DISABLE_AUTOSAVE = 'user/DISABLE_AUTOSAVE'
// const NOTICE_UNSAVED_CHANGES = 'user/NOTICE_UNSAVED_CHANGES'
const UPDATE_DECK_COUNT = 'user/UPDATE_DECK_COUNT'
const SET_TOKEN = 'user/SET_TOKEN'

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
    displayName: action.user.displayName,
    email: action.user.email,
    emailVerified: action.user.emailVerified,
    photoURL: action.user.photoURL,
    isAnonymous: action.user.isAnonymous,
    uid: action.user.uid,
    providerData: action.user.providerData,
    authenticated: true,
    isAuthenticating: false
  }),
  logout: (state, action) => ({
    ...state,
    displayName: null,
    email: null,
    emailVerified: null,
    photoURL: null,
    isAnonymous: null,
    uid: null,
    providerData: null,
    authenticated: false,
    isAuthenticating: false
  }),
  userAuthSuccess: (state, action) => ({
    ...state,
    authenticated: true,
    isAuthenticating: false
  }),
  userAuthRequest: (state, action) => ({
    ...state,
    isAuthenticating: true
  }),
  userAuthFail: (state, action) => ({
    ...state,
    isAuthenticating: false
  }),
  stopAuthenticating: (state, action) => ({
    ...state,
    isAuthenticating: false
  }),
  updateDeckCount: (state, action) => ({
    ...state,
    deckCount: action.count
  }),
  setToken: (state, action) => ({
    ...state,
    token: action.token
  })
}

const handlers = {
  [REGISTER]: reducers.register,
  [LOGIN]: reducers.login,
  [LOGOUT]: reducers.logout,
  [USER_AUTH_SUCCESS]: reducers.userAuthSuccess,
  [USER_AUTH_FAIL]: reducers.userAuthFail,
  [USER_AUTH_REQUEST]: reducers.userAuthRequest,
  [USER_AUTH_COMPLETE]: reducers.stopAuthenticating,
  [UPDATE_DECK_COUNT]: reducers.updateDeckCount,
  [SET_TOKEN]: reducers.setToken
}

export default createReducer({}, handlers)

/**
 * Action Creators
 */
export const userAuthSuccess = () => ({
  type: USER_AUTH_SUCCESS
})
export const userAuthRequest = () => ({
  type: USER_AUTH_REQUEST
})
export const userAuthFail = () => ({
  type: USER_AUTH_FAIL
})
export const stopAuthenticating = () => ({
  type: USER_AUTH_COMPLETE
})
export function register (username, password) {
  return { type: REGISTER, username, password }
}
export function loginUser (user) {
  return { type: LOGIN, user }
}
export function logoutUser (username) {
  return { type: LOGOUT, username }
}
export function updateDeckCount (count) {
  return { type: UPDATE_DECK_COUNT, count }
}
export function setToken (token) {
  return { type: SET_TOKEN, token }
}

/**
 * Side Effects
 */
export const logout = username =>
  dispatch => {
    auth.signOut()
    // dispatch(setToken(null))
    // localStorage.setItem(storageKey, {})
    dispatch(removeAllDecks())
    localStorage.clear()
  }

export const signUpEmail = (username, password) =>
  (dispatch) => {
    // Disable the login/signup buttons while we're authenticating with Firebase
    dispatch(userAuthRequest())

    return auth.createUserWithEmailAndPassword(username, password)
      .then((e) => {
        dispatch(userAuthSuccess())
        dispatch(login(e.providerData[0]))
      })
      .catch((err) => {
        dispatch(userAuthFail())
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
        // console.log('Signup error', err, 'username', username, 'password', password)

        return message
      })
  }

export const signInWithProvider = provider =>
  (dispatch) => {
    // Disable the login/signup buttons while we're authenticating with Firebase
    dispatch(userAuthRequest())

    return auth.signInWithPopup(provider)
      .then((result) => {
        dispatch(userAuthSuccess())

        // const token = result.credential.accessToken
        // localStorage.setItem(storageKey, {
        //   token: token
        // })
        // dispatch(setToken(token))
        // const user = result.user
        // console.log('user:', user)
        // console.log('token:', token)
        // dispatch(login('testing', 'github'))
      })
      .catch((err) => {
        dispatch(userAuthFail())

        let message
        // Handle Errors here.
        const errorCode = err.code
        // const errorMessage = err.message
        // // The email of the user's account used.
        // const email = err.email
        // // The firebase.auth.AuthCredential type that was used.
        // const credential = err.credential
        if (errorCode === 'auth/account-exists-with-different-credential') {
          message = 'You have signed up with a different provider for that email.'
        } else {
          console.error(err)
        }

        return message
      })
  }

export const signInGithub = () =>
  (dispatch) => {
    const provider = new firebase.auth.GithubAuthProvider()
    // Can add additional permissions here
    // provider.addScope('repo')
    return dispatch(signInWithProvider(provider))
  }

export const signInTwitter = () =>
  (dispatch) => {
    const provider = new firebase.auth.TwitterAuthProvider()
    return dispatch(signInWithProvider(provider))
  }

export const signInGoogle = () =>
  (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    return dispatch(signInWithProvider(provider))
  }

export const login = (username, password) =>
  (dispatch) => {
    // Disable the login/signup buttons while we're authenticating with Firebase
    dispatch(userAuthRequest())

    return auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        dispatch(userAuthSuccess())
      })
      .catch((err) => {
        dispatch(userAuthFail())
        let message
        if (err.code === 'auth/invalid-email' ||
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password') {
          message = 'Invalid username or password'
        } else {
          message = err.message
        }

        // console.log('Login error', err, 'username', username, 'password', password)
        return message
      })
  }

export const isAuthenticated = () =>
  !!auth.currentUser || !!localStorage.getItem(storageKey)

// Dispatching an action to set up the firebase auth listener probably isn't the
// best way to do this. Using this pattern for now, but needs revision
export const setupAuthHook = (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(loginUser(user))
      dispatch(fetchUserDecks())
    } else {
      dispatch(logoutUser(user))
    }
  })
}
