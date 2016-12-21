**Other Neat Features**
Below are some ongoing "best practices" employed/to be employed in this project. This may be of interest to any React developers who may be poking around in the code for examples.
- [x] Local styles are written at the component level via [CSS Modules](https://github.com/css-modules/css-modules)
- [ ] The Redux state object is an [ImmutableJS](https://facebook.github.io/immutable-js/) map to force immutability throughout the application (**Coming soon**)
- [ ] Uses selectors to retrieve data via [reselect](https://github.com/reactjs/reselect) (**Coming soon**)
- [ ] Redux components are organized into "ducks", which combines actions, reducers, and action creators into a single file. [Proposal is here.](https://github.com/erikras/ducks-modular-redux) (**Coming soon**)
- [ ] Layouts are created using a functional CSS toolkit called [Tachyons](http://tachyons.io/) (**Coming soon**)


- Turn Edit Card into a modal instead of a URL route
  - Issue: modals are global and contextless; edit card requires context and is only applicable in certain areas of the app (i.e. within a deck). How should we navigate this? Options:
    - Modal open on condition (requires editing the modal container)
    - Instead of the global modal container, put the edit card modal into a local modal container (requires managing two modal containers)
- Work on improvements for mobile viewing
  - Issue with Oversized modals and scrolling
  - Importing the scaling of h1 fonts for mobile viewing
- Find a better way to handle modals than putting it all in the navbar
  - ModalContainer component?
- Need to separate the global keybinds into its own component that will be a parent component for all components that will register keybind events to it
