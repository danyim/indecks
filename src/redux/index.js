import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import config from './modules/config';
import decks from './modules/decks';

export default combineReducers({
  config,
  decks,
  form,
  routing
});
