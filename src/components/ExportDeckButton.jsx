import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  filename: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  exportFile: PropTypes.func,
}

const defaultProps = {
  filename: 'file.txt',
  label: 'Save',
  className: '',
  disabled: false,
  style: {
    margin: '5px 5px 0px 0px',
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer',
  },
  exportFile: () => {},
}

class ExportDeckButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleDownloadClick = this.handleDownloadClick.bind(this)
  }

  magicDownload(text, fileName) {
    const blob = new Blob([text], {
      type: 'text/csv;charset=utf8;',
    })

    // create hidden link
    const element = document.createElement('a')
    document.body.appendChild(element)
    element.setAttribute('href', window.URL.createObjectURL(blob))
    element.setAttribute('download', fileName)
    element.style.display = ''

    element.click()

    document.body.removeChild(element)
  }

  handleDownloadClick(event) {
    const fileType = event.target.innerText
    const text = this.props.exportFile(fileType)

    if (text instanceof Promise) {
      text.then(result => this.magicDownload(result, this.props.filename))
    } else {
      this.magicDownload(text, this.props.filename)
      event.stopPropagation()
    }
  }

  render() {
    return (
      <button
        style={this.props.style}
        className={this.props.className}
        onClick={this.handleDownloadClick}
        disabled={this.props.disabled}
      >
        {this.props.label}
      </button>
    )
  }
}

ExportDeckButton.propTypes = propTypes
ExportDeckButton.defaultProps = defaultProps

export default ExportDeckButton
