import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import App from './components/App';
import DeckGridContainer from './components/DeckGridContainer';
import ImportDeck from './components/ImportDeck';
import CardViewContainer from './components/CardViewContainer';
import DeckEditContainer from './components/DeckEditContainer';
import DeckViewContainer from './components/DeckViewContainer';
import DeckAdd from './components/DeckAdd';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={DeckGridContainer}></IndexRoute>
    <Route path="/view/:deckId" component={DeckViewContainer}></Route>
    <Route path="/add/:deckId" component={DeckAdd}></Route>
    <Route path="/edit/:deckId/:cardIndex" component={DeckEditContainer}></Route>
    <Route path="/view/:deckId/:cardIndex" component={CardViewContainer}></Route>
    <Route path="/add" component={ImportDeck}></Route>
    <Route path="*" component={DeckGridContainer}/>
  </Route>
);

export default Routes;
