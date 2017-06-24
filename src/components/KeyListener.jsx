import PropTypes from 'prop-types'
import React from 'react'
import KeyBinding from 'react-keybinding-component'

/**
 * Handlers should be an array of objects in the form:
 *   {
 *     keyCode: [Number],
 *     action: [Function]
 *   }
 */
class KeyListener extends React.Component {
  static propTypes = {
    handlers: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  static defaultProps = {
    handlers: []
  }

  constructor (props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (e) {
    this.props.handlers.forEach((h) => {
      if (h && h.keyCode && h.action && h.keyCode === e.keyCode) {
        h.action()
      }
    })
  }

  render () {
    return (
      <KeyBinding
        onKey={e => this.handleKeyDown(e)}
        preventInputConflict
        preventPropagation
      />
    )
  }
}

export default KeyListener
