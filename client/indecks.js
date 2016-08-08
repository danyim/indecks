import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store';

// import css
import css from './styles/style.styl';

// import components
import App from './components/App';
import ImportDeck from './components/ImportDeck';
import CardView from './components/CardView';
import DeckEdit from './components/DeckEdit';
import DeckView from './components/DeckView';
import DeckGrid from './components/DeckGrid';
import DeckAdd from './components/DeckAdd';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={DeckGrid}></IndexRoute>
        <Route path="/view/:deckId" component={DeckView}></Route>
        <Route path="/add/:deckId" component={DeckAdd}></Route>
        <Route path="/edit/:deckId/:cardIndex" component={DeckEdit}></Route>
        <Route path="/view/:deckId/:cardIndex" component={CardView}></Route>
        <Route path="/add" component={ImportDeck}></Route>
      </Route>
    </Router>
  </Provider>
)
render(router, document.getElementById('react-root'));
