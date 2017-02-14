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

1. `yarn` to grab all the necessary dependencies.
2. `npm start` and open [http://localhost:9406](http://localhost:9406) in your browser.

**Production**

1. Run `npm build` to create a distro folder and a bundle.js file.

### License
  MIT
