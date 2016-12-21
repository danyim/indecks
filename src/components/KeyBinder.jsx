import React from 'react';
import KeyListener from './KeyListener';
import styles from '../styles/components/Navbar';

const propTypes = {};

const defaultProps = {};

/**
 *  Handles the registry of global keybindings and their respective handlers
 */
class KeyBinder extends React.Component {
  constructor(props) {
    super(props);

    this.registerKeyBinding = this.registerKeyBinding.bind(this);
    this.handlers = [];
  }

  registerKeyBinding(handler) {
    if(!this.handlers.find(x => x.keyCode === handler.keyCode)) {
      this.handlers.push(handler);
    }
  }

  render() {
    return (
      <div>
        <KeyListener handlers={this.handlers} />
        {
        // TODO: Figure out how to add a prop to the child components
        }
        {this.props.children}
      </div>
    );
  }
}

KeyBinder.propTypes = propTypes;
KeyBinder.defaultProps = defaultProps;

export default KeyBinder;
