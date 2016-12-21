import React from 'react';
import Modal from 'react-modal';
import CardEditContainer from './CardEditContainer';
import ImportDeckContainer from './ImportDeckContainer';
import SettingsContainer from './SettingsContainer';
import KeyListener from '../components/KeyListener';
import ShortcutHelper from '../components/ShortcutHelper';
// import Settings from '../components/Settings';
import styles from '../styles/components/Navbar';

const propTypes = {
};

const defaultProps = {};

const modalTypes = ['SETTINGS', 'IMPORT', 'SHORTCUTS', 'CARDEDIT'];

/**
 * This container controls all the global modals and their associated keyboard
 * shortcuts
 */
class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // Sets the initial state of all modal types in the const above as false
    this.state = { openModals: {} };
    modalTypes.map(modalType => {
      this.state.openModals[modalType] = false;
    });

    // Keyboard shortcut handlers
    this.handlers = [
      {
        keyCode: 73, // 'i'
        action: this.openModal.bind(this, 'IMPORT')
      },
      {
        keyCode: 74, // 'j'
        action: this.openModal.bind(this, 'CARDEDIT')
      },
      {
        keyCode: 188, // ',' comma
        action: this.openModal.bind(this, 'SETTINGS')
      },
      {
        keyCode: 191, // '/' forward slash
        action: this.openModal.bind(this, 'SHORTCUTS')
      }
    ];
  }

  closeModal(modalType) {
    const { openModals } = this.state;
    openModals[modalType] = false;
    this.setState(openModals);
  }

  openModal(modalType) {
    const { openModals } = this.state;
    openModals[modalType] = true;
    this.setState(openModals);
  }

  renderCardEditModal() {
    return (
      <Modal
        isOpen={this.state.openModals['CARDEDIT'] ? this.state.openModals['CARDEDIT'] : false}
        onRequestClose={this.closeModal.bind(this, 'CARDEDIT')}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
      >
        <CardEditContainer handleClose={this.closeModal.bind(this, 'CARDEDIT')} />
      </Modal>
    );
  }

  renderImportDeckModal() {
    return (
      <Modal
        isOpen={this.state.openModals['IMPORT'] ? this.state.openModals['IMPORT'] : false}
        onRequestClose={this.closeModal.bind(this, 'IMPORT')}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
      >
        <ImportDeckContainer handleClose={this.closeModal.bind(this, 'IMPORT')} />
      </Modal>
    );
  }

  renderShortcutsModal() {
    return (
      <Modal
        isOpen={this.state.openModals['SHORTCUTS'] ? this.state.openModals['SHORTCUTS'] : false}
        onRequestClose={this.closeModal.bind(this, 'SHORTCUTS')}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
      >
        <ShortcutHelper handleClose={this.closeModal.bind(this, 'SHORTCUTS')} />
      </Modal>
    );
  }

  renderSettingsModal() {
    return (
      <Modal
        isOpen={this.state.openModals['SETTINGS'] ? this.state.openModals['SETTINGS'] : false}
        onRequestClose={this.closeModal.bind(this, 'SETTINGS')}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
      >
        <SettingsContainer handleClose={this.closeModal.bind(this, 'SETTINGS')} />
      </Modal>
    );
  }

  renderModal(component, alias) {
   return (
      <Modal
        isOpen={this.state.openModals[alias] ? this.state.openModals[alias] : false}
        onRequestClose={this.closeModal.bind(this, alias)}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
      >
        {
          // FIgure out how to parameterize the rendering of components
        }
        <component handleClose={this.closeModal.bind(this, alias)} />
      </Modal>
    );
  }

  render() {
    return (
      <div>
        {this.renderCardEditModal()}
        {this.renderImportDeckModal()}
        {this.renderShortcutsModal()}
        {this.renderSettingsModal()}

        {
          // Uncomment these once you figure out how to parameterize components
          // in renderModal
          // this.renderModal(CardEditContainer, 'CARDEDIT')
          // this.renderModal(ImportDeckContainer, 'IMPORT')
          // this.renderModal(ShortcutHelper, 'SHORTCUTS')
          // this.renderModal(SettingsContainer, 'SETTINGS')
        }
        <KeyListener handlers={this.handlers} />
        {
        // TODO: Figure out how to add a prop to the child components
        }
        {this.props.children}
      </div>
    );
  }
}

ModalContainer.propTypes = propTypes;
ModalContainer.defaultProps = defaultProps;

export default ModalContainer;
