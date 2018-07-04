**Other Neat Features**
Below are some ongoing "best practices" employed/to be employed in this project. This may be of interest to any React developers who may be poking around in the code for examples.

- [x] Local styles are written at the component level via [CSS Modules](https://github.com/css-modules/css-modules)
- [x] Redux components are organized into "ducks", which combines actions, reducers, and action creators into a single file. [Proposal is here.](https://github.com/erikras/ducks-modular-redux)
- [x] Build/select testing framework -- Jest/Enzyme
- [x] Write tests for all Redux reducers -- `config` ducks covered
- [x] Figure out how to make `jest` parse ES6 when running tests
- [ ] Convert the `decks` state to be an associative array instead of an array
- [ ] Layouts are created using a functional CSS toolkit called [Tachyons](http://tachyons.io/)
- [ ] Create `npm test` task that includes the `nyc` coverage reporter
- [ ] The Redux state object is an [ImmutableJS](https://facebook.github.io/immutable-js/) map to force immutability throughout the application
- [ ] Uses selectors to retrieve data via [reselect](https://github.com/reactjs/reselect) (**Coming soon**)
- [ ] Fix overlapping modals when opening multiple modals via keyboard shortcuts
- [x] Create a shared proptypes file
  - [https://goshakkk.name/redux-antipattern-mapstatetoprops/](https://goshakkk.name/redux-antipattern-mapstatetoprops/)
  - [https://github.com/reactjs/react-docgen/issues/33](https://github.com/reactjs/react-docgen/issues/33)
- [x] Migrate to [`styled-components`](https://github.com/styled-components/styled-components) instead of CSS modules
