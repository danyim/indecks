import React from 'react'
import PropTypes from 'prop-types'
import StylePropType from 'react-style-proptype'
import Modal from './Modal'
import styles from '../styles/components/ModalHelpButton.styl'

class ModalHelpButton extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: StylePropType
  }

  static defaultProps = {
    style: {}
  }

  constructor(props) {
    super(props)

    this.toggleModal = this.toggleModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      open: false,
      x: 0,
      y: 0
    }
  }

  toggleModal(e) {
    // console.log('screenX', e.nativeEvent.screenX)
    // console.log('screenY', e.nativeEvent.screenY)
    this.setState({
      open: !this.state.open,
      x: e.nativeEvent.screenX + 200,
      y: e.nativeEvent.screenY
    })
  }

  closeModal() {
    this.setState({ open: false })
  }

  render() {
    return (
      <span>
        <span
          className={styles.button}
          onClick={this.toggleModal}
          role="presentation"
        >
          <i className="fa fa-question-circle-o" aria-hidden="true" />
        </span>

        <Modal
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
          contentLabel={'Help'}
          className={styles.modal}
          overlayClassName={styles.overlay}
          style={{ left: this.state.x, top: this.state.y, ...this.props.style }}
        >
          <a
            className="close-modal"
            onClick={this.closeModal}
            role="presentation"
          >
            Close
          </a>
          {this.props.children}
        </Modal>
      </span>
    )
  }
}

export default ModalHelpButton
