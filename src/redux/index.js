import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import { all } from 'redux-saga/effects'

import config from './modules/config'
import decks, { listeners as decksListeners } from './modules/decks'
// import decks /* , { sagas as deckSagas } */ from './modules/decks'
import user from './modules/user'

export const rootReducer = combineReducers({
  config,
  decks,
  user,
  form,
  routing
})

export function* rootSaga() {
  yield all(
    [
      // deckSagas(),
    ]
  )
}

export const rootListener = [decksListeners]
