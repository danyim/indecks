import React from 'react';
import { render } from 'react-dom';
// import css
import css from './styles/style.styl';

// import components
import App from './components/App';
import DeckEdit from './components/DeckEdit';
import DeckView from './components/DeckView';
import DeckGrid from './components/DeckGrid';

// import router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={DeckGrid}></IndexRoute>
        <Route path="/add" component={DeckGrid}></Route>
        <Route path="/edit/:deckId/:cardIndex" component={DeckEdit}></Route>
        <Route path="/view/:deckId/:cardIndex" component={DeckView}></Route>
      </Route>
    </Router>
  </Provider>
)
render(router, document.getElementById('root'));
