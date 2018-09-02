/* @flow */
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import config from './modules/config'
import decks from './modules/decks'
import user from './modules/user'
import type { State as ConfigState } from './modules/config'
import type { State as DecksState } from './modules/decks'
import type { State as UserState } from './modules/user'

export type State = {
  config: ConfigState,
  decks: DecksState,
  user: UserState,
}

export const rootReducer = combineReducers({
  config,
  decks,
  user,
  form,
})
