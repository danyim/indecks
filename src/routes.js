import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import App from './components/App';
import DeckGridContainer from './components/DeckGridContainer';
import ImportDeck from './components/ImportDeck';
import CardView from './components/CardView';
import DeckEdit from './components/DeckEdit';
import DeckView from './components/DeckView';
import DeckAdd from './components/DeckAdd';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={DeckGridContainer}></IndexRoute>
    <Route path="/view/:deckId" component={DeckView}></Route>
    <Route path="/add/:deckId" component={DeckAdd}></Route>
    <Route path="/edit/:deckId/:cardIndex" component={DeckEdit}></Route>
    <Route path="/view/:deckId/:cardIndex" component={CardView}></Route>
    <Route path="/add" component={ImportDeck}></Route>
    <Route path="*" component={DeckGridContainer}/>
  </Route>
);

export default Routes;
