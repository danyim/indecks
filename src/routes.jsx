/* eslint-disable global-require */
const routes = [
  {
    path: '/',
    exact: true,
    component: require('./containers/DeckGridContainer').default
  },
  {
    path: '/add/:deckId',
    exact: true,
    component: require('./containers/DeckAddContainer').default
  },
  {
    path: '/view/:deckId',
    exact: true,
    component: require('./containers/DeckViewContainer').default
  },
  {
    path: '/edit/:deckId/:cardIndex',
    exact: true,
    component: require('./containers/CardEditContainer').default
  },
  {
    path: '/view/:deckId/:cardIndex',
    exact: true,
    component: require('./containers/CardViewContainer').default
  }
]

export default routes
