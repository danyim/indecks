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
    push: PropTypes.func.isRequired,
    currentModal: PropTypes.string,
  }

  static defaultProps = {
    currentModal: null,
  }

  constructor(props) {
    super(props)

    this.handlers = [
      {
        keyCode: 73, // 'i'
        action: () => this.props.changeActiveModal(ModalTypes.Import),
      },
      {
        keyCode: 188, // ',' comma
        action: () => this.props.changeActiveModal(ModalTypes.Settings),
      },
      {
        keyCode: 191, // '/' forward slash
        action: () => this.props.changeActiveModal(ModalTypes.Shortcuts),
      },
      {
        keyCode: 83, // 's'
        action: () => this.props.changeActiveModal(ModalTypes.Selector),
      },
    ]
  }

  renderModal(Component, ModalType, label) {
    return (
      <Modal
        isOpen={this.props.currentModal === ModalType}
        onRequestClose={this.props.closeModal}
        contentLabel={label}
      >
        <Component
          handleClose={this.props.closeModal}
          handleOnSelected={this.props.closeModal}
          push={this.props.push}
        />
      </Modal>
    )
  }

  render() {
    return (
      <div>
        {this.renderModal(ImportDeckContainer, ModalTypes.Import, 'Import Deck')}
        {this.renderModal(ShortcutHelper, ModalTypes.Shortcuts, 'Keyboard Shortcuts')}
        {this.renderModal(SettingsContainer, ModalTypes.Settings, 'Settings')}
        {this.renderModal(DeckSelectorContainer, ModalTypes.Selector, 'Deck Selector')}
        <KeyListener handlers={this.handlers} />
      </div>
    )
  }
}

export default ModalContainer
