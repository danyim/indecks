import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import decks from './decks';

const rootReducer = combineReducers({ decks, routing: routerReducer});

export default rootReducer;
