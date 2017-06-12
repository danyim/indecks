import PropTypes from 'prop-types'
import React from 'react'
import Remarkable from 'remarkable'

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  handleOnClick: PropTypes.func
}

const defaultProps = {
  className: '',
  text: '',
  handleOnClick: null
}

class Markdown extends React.Component {
  convertToMarkdown (plaintext = '') {
    const md = new Remarkable()
    const rawMarkup = md.render(plaintext)
    return { __html: rawMarkup }
  }

  render () {
    return (
      <div
        className={this.props.className}
        onClick={this.props.handleOnClick}
        dangerouslySetInnerHTML={ // eslint-disable-line
          this.convertToMarkdown(this.props.text)
        }
      />
    )
  }
}

Markdown.propTypes = propTypes
Markdown.defaultProps = defaultProps

export default Markdown
