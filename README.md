<p align="center"><img class="center" src="https://yimd.net/images/indecks-logo.png" alt="Indecks"></p>

Indecks is an interactive index card study app built using React/Redux. Use it to study (or _cram_) test material on a desktop or a mobile device.

[![Build Status](https://travis-ci.org/danyim/indecks.svg?branch=master)](https://travis-ci.org/danyim/indecks)

[Live Link](https://indecks.netlify.com/)

### Features
- Real-time synchronization of deck data across devices
- Save data using Twitter, GitHub, Google or email/password for authentication
- Full GitHub-flavored Markdown support (including images) for card contents
- Minimalistic layout tailored for desktop and mobile on-the-go viewing
  - Captures swipes on mobile for quickly navigating between cards
- Keyboard shortcuts for quick navigation (see legend below)
- Offline persistence with local storage
- Import/export of decks via JSON

### Keyboard Shortcuts
| Key | Function | Context |
| --- | -------- | ------- |
| <kbd>D</kbd> | Deck Quick Selector | Global |
| <kbd>/</kbd> | Keyboard Shortcuts Cheatsheet | Global |
| <kbd>I</kbd> | Add/Import Deck | Global |
| <kbd>,</kbd> | Settings | Global |
| <kbd>RARROW</kbd> | Next Card | While viewing a deck |
| <kbd>LARROW</kbd> | Previous Card | While viewing a deck |
| <kbd>A</kbd> | Add a card | While viewing a deck |
| <kbd>E</kbd> | Edit card | While viewing a deck |
| <kbd>SPACE</kbd> | Flip card | While viewing a deck |
| <kbd>S</kbd> | Toggle shuffle | While viewing a deck |
| <kbd>D</kbd> | Return to deck | While viewing a deck |

### Builds
**Local**

1. `yarn` to grab all the necessary dependencies.
2. `yarn start` and open [http://localhost:9406](http://localhost:9406) in your browser.
3. `yarn test` to unit tests

**Production**

1. Run `yarn build`
2. Copy `index.html` into `/dist` 
3. Place `/dist` on a server

### License
  MIT
