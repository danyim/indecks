import React from 'react'
import PropTypes from 'prop-types'
import DeckSelectorContainer from '../containers/DeckSelectorContainer'
import ImportDeckContainer from '../containers/ImportDeckContainer'
import SettingsContainer from '../containers/SettingsContainer'
import Modal from './Modal'
import KeyListener from './KeyListener'
import ShortcutHelper from './ShortcutHelper'
import ModalTypes from './ModalTypes'

class ModalContainer extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    changeActiveModal: PropTypes.func.isRequired,
    currentModal: PropTypes.string
  }

  static defaultProps = {
    currentModal: null
  }

  constructor(props) {
    super(props)

    this.handlers = [
      {
        keyCode: 73, // 'i'
        action: () => this.props.changeActiveModal(ModalTypes.Import)
      },
      {
        keyCode: 188, // ',' comma
        action: () => this.props.changeActiveModal(ModalTypes.Settings)
      },
      {
        keyCode: 191, // '/' forward slash
        action: () => this.props.changeActiveModal(ModalTypes.Shortcuts)
      },
      {
        keyCode: 83, // 's'
        action: () => this.props.changeActiveModal(ModalTypes.Selector)
      }
    ]
  }

  renderImportDeckModal() {
    return (
      <Modal
        isOpen={this.props.currentModal === ModalTypes.Import}
        onRequestClose={this.props.closeModal}
        contentLabel="Import Deck"
      >
        <ImportDeckContainer handleClose={this.props.closeModal} />
      </Modal>
    )
  }

  renderShortcutsModal() {
    return (
      <Modal
        isOpen={this.props.currentModal === ModalTypes.Shortcuts}
        onRequestClose={this.props.closeModal}
        contentLabel="Keyboard Shortcuts"
      >
        <ShortcutHelper handleClose={this.props.closeModal} />
      </Modal>
    )
  }

  renderSettingsModal() {
    return (
      <Modal
        isOpen={this.props.currentModal === ModalTypes.Settings}
        onRequestClose={this.props.closeModal}
        contentLabel="Settings"
      >
        <SettingsContainer handleClose={this.props.closeModal} />
      </Modal>
    )
  }

  renderDeckSelectorModal() {
    return (
      <Modal
        isOpen={this.props.currentModal === ModalTypes.Selector}
        onRequestClose={this.props.closeModal}
        contentLabel="Import Deck"
      >
        <DeckSelectorContainer handleClose={this.props.closeModal} />
      </Modal>
    )
  }

  render() {
    return (
      <div>
        {this.renderImportDeckModal()}
        {this.renderShortcutsModal()}
        {this.renderSettingsModal()}
        {this.renderDeckSelectorModal()}
        <KeyListener handlers={this.handlers} />
      </div>
    )
  }
}

export default ModalContainer
