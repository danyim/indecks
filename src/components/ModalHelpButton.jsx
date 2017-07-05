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
    // console.log('pageX', e.nativeEvent.pageX)
    // console.log('pageY', e.nativeEvent.pageY)
    this.setState({
      open: !this.state.open,
      x: e.nativeEvent.pageX + 215,
      y: e.nativeEvent.pageY + 75
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
          <i className="fa fa-question-circle-o" />
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
