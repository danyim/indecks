import React from 'react';
import KeyBinding from 'react-keybinding-component';

/**
 * Handlers should be an array of objects in the form:
 *   {
 *     keyCode: [Number],
 *     action: [Function]
 *   }
 */
const propTypes = {
  handlers: React.PropTypes.array.isRequired
};

const defaultProps = {
  handlers: []
};

class KeyListener extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    this.props.handlers.forEach(h => {
      if (h && h.keyCode && h.action && h.keyCode === e.keyCode) {
        h.action();
      }
    });
  }

  render() {
    return (
      <KeyBinding
        onKey={e => this.handleKeyDown(e)}
        preventInputConflict={true}
        preventPropagation={true}
      />
    );
  }
}

KeyListener.propTypes = propTypes;
KeyListener.defaultProps = defaultProps;

export default KeyListener;
