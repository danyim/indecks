/* eslint-disable global-require */
const routes = [
  {
    path: '/',
    exact: true,
    Component: require('./containers/DeckGridContainer').default,
  },
  {
    path: '/add/:deckId',
    exact: true,
    Component: require('./containers/DeckAddContainer').default,
  },
  {
    path: '/view/:deckId',
    exact: true,
    Component: require('./containers/DeckViewContainer').default,
  },
  {
    path: '/edit/:deckId/:cardIndex',
    exact: true,
    Component: require('./containers/CardEditContainer').default,
  },
  {
    path: '/view/:deckId/:cardIndex',
    exact: true,
    Component: require('./containers/CardViewContainer').default,
  },
]

export default routes
