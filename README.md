# indecks
Indecks is an interactive index card study app built using React/Redux. Use it to study (or _cram_) test material on a desktop or a mobile device.

[Live Link](https://danyim.github.io/indecks/)

### Features
- Minimalistic layout tailored for desktop and mobile on-the-go viewing
  - Captures swipes on mobile for quickly navigating between cards
- Markdown support for card contents
- Import/export of decks via JSON
- Data persistence through local storage
- Keyboard shortcuts for quick navigation (see legend below)
- _Google authentication & user data with a Firebase backend (**Coming soon**)_

**Other Geeky Features**
Below are some ongoing "best practices" employed/to be employed in this project. This may be of interest to any React developers who may be poking around in the code for examples.
- [x] Local styles are written at the component level via [CSS Modules](https://github.com/css-modules/css-modules)
- [ ] The Redux state object is an [ImmutableJS](https://facebook.github.io/immutable-js/) map to force immutability throughout the application (**Coming soon**)
- [ ] Uses selectors to retrieve data via [reselect](https://github.com/reactjs/reselect) (**Coming soon**)
- [ ] Redux components are organized into "ducks", which combines actions, reducers, and action creators into a single file. [Proposal is here.](https://github.com/erikras/ducks-modular-redux) (**Coming soon**)
- [ ] Layouts are created using a functional CSS toolkit called [Tachyons](http://tachyons.io/) (**Coming soon**)

### Keyboard Shortcuts
| Key | Function |
| --- | -------- |
| <kbd>RARROW</kbd> | Next Card |
| <kbd>LARROW</kbd> | Previous Card |
| <kbd>A</kbd> | Add a card |
| <kbd>E</kbd> | Edit card |
| <kbd>SPACE</kbd> | Flip card |
| <kbd>S</kbd> | Toggle shuffle |
| <kbd>D</kbd> | Return to deck |

### Build
**Local**

1. `npm install` to grab all the necessary dependencies.
2. `npm start` and open [http://localhost:9406](http://localhost:9406) in your browser.

**Production**

1. Run `npm build` to create a distro folder and a bundle.js file.

### Thanks
Thanks to [this course](https://learnredux.com/) by @wesbos for providing the early foundation for this project

### License
  MIT
