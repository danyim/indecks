import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import config from './config';
import decks from './decks';

const rootReducer = combineReducers({ config, decks, routing: routerReducer});

export default rootReducer;
