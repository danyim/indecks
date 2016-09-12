import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import config from './config';
import decks from './decks';

const reducers = {
  config,
  decks,
  form: formReducer,
  routing: routerReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
