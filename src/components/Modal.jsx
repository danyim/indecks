import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import styles from '../styles/components/Modal.styl'

class Modal extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    contentLabel: PropTypes.string.isRequired,
    onAfterOpen: PropTypes.func,
    className: PropTypes.string,
    overlayClassName: PropTypes.string
  }

  static defaultProps = {
    onAfterOpen: () => {},
    className: styles['modal-content'],
    overlayClassName: styles['modal-overlay']
  }

  render() {
    const className = `${styles['modal-content']} ${this.props.className}`
    const overlayClassName = `${styles['modal-overlay']} ${this.props
      .overlayClassName}`

    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        onAfterOpen={this.props.onAfterOpen}
        className={className}
        overlayClassName={overlayClassName}
        contentLabel={this.props.contentLabel}
      >
        <a
          className="close-modal"
          onClick={this.props.onRequestClose}
          role="presentation"
        >
          Close
        </a>
        {this.props.children}
      </ReactModal>
    )
  }
}

export default Modal
