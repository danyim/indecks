# indecks
An interactive index card study app built using React/Redux. Use it to study (cram?) for tests.

[Live Link](http://indecks.s3-website-us-east-1.amazonaws.com/)

### Features
- Minimalistic layout tailored for desktop and mobile on-the-go viewing
  - Captures swipes on mobile for quickly navigating between cards
- Markdown support for card contents
- Import/export of decks via JSON
- Keyboard shortcuts for quick navigation (see legend below)

### Keyboard Shortcuts
- <kbd>RARROW</kbd> - Next Card
- <kbd>LARROW</kbd> - Previous Card
- <kbd>a</kbd> - Add a card
- <kbd>e</kbd> - Edit card
- <kbd>SPACE</kbd> - Flip card
- <kbd>s</kbd> - Toggle shuffle
- <kbd>d</kbd> - Return to deck

### Local Build
1. `npm install` to grab all the necessary dependencies.
2. `npm start` and open [http://localhost:9406](http://localhost:9406) in your browser.

### Production Build
1. Run `npm build` to create a distro folder and a bundle.js file.

### License
  MIT

### Links
- Thanks to [this course by @wesbos](https://learnredux.com/) for providing the foundation for this project
