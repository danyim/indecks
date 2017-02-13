**Other Neat Features**
Below are some ongoing "best practices" employed/to be employed in this project. This may be of interest to any React developers who may be poking around in the code for examples.
- [x] Local styles are written at the component level via [CSS Modules](https://github.com/css-modules/css-modules)
- [ ] The Redux state object is an [ImmutableJS](https://facebook.github.io/immutable-js/) map to force immutability throughout the application (**Coming soon**)
- [ ] Uses selectors to retrieve data via [reselect](https://github.com/reactjs/reselect) (**Coming soon**)
- [x] Redux components are organized into "ducks", which combines actions, reducers, and action creators into a single file. [Proposal is here.](https://github.com/erikras/ducks-modular-redux)
- [ ] Layouts are created using a functional CSS toolkit called [Tachyons](http://tachyons.io/) (**Coming soon**)
