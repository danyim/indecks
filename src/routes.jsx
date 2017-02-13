import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/App';
import CardEditContainer from './containers/CardEditContainer';
import CardViewContainer from './containers/CardViewContainer';
// import DeckEditContainer from './containers/DeckEditContainer';
import DeckGridContainer from './containers/DeckGridContainer';
import DeckViewContainer from './containers/DeckViewContainer';
import DeckAddContainer from './containers/DeckAddContainer';
// import ImportDeckContainer from './containers/ImportDeckContainer';
// import SettingsContainer from './containers/SettingsContainer';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={DeckGridContainer} />
    <Route path="/view/:deckId" component={DeckViewContainer} />
    <Route path="/add/:deckId" component={DeckAddContainer} />
    <Route path="/edit/:deckId/:cardIndex" component={CardEditContainer} />
    <Route path="/view/:deckId/:cardIndex" component={CardViewContainer} />
    {/*
    <Route path="/edit/:deckId" component={DeckEditContainer} />
    <Route path="/add" component={ImportDeckContainer} />
    <Route path="/settings" component={SettingsContainer} />
    */}
    <Route path="*" component={DeckGridContainer} />
  </Route>
);

export default Routes;
