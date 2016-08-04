import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import decks from './decks';
// Probably overfill with a single state object
const rootReducer = combineReducers({ decks, routing: routerReducer});

export default rootReducer;
