import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import config from './modules/config'
import decks from './modules/decks'
import user from './modules/user'

export const rootReducer = combineReducers({
  config,
  decks,
  user,
  form,
})
