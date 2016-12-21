import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImportDeckContainer from './ImportDeckContainer';
import SettingsContainer from './SettingsContainer';
import KeyListener from '../components/KeyListener';
import ShortcutHelper from '../components/ShortcutHelper';
import * as deckActions from '../action-creators/deck';
// import Settings from '../components/Settings';
import styles from '../styles/components/Navbar';

const propTypes = {
  // deckCount: React.PropTypes.number.isRequired,
  // removeAllDecks: React.PropTypes.func.isRequired
};

const defaultProps = {};

const modalTypes = ['SETTINGS', 'IMPORT', 'SHORTCUTS'];

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      openModals: {
        SETTINGS: false,
        IMPORT: false,
        SHORTCUTS: false
      }
    };

    this.handlers = [
      {
        keyCode: 73, // 'i'
        action: this.openModal.bind(this, 'IMPORT')
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

  renderImportDeckModal() {
    return (
      <Modal
        isOpen={this.state.openModals.IMPORT ? this.state.openModals.IMPORT : false}
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
        isOpen={this.state.openModals.SHORTCUTS ? this.state.openModals.SHORTCUTS : false}
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
        isOpen={this.state.openModals.SETTINGS ? this.state.openModals.SETTINGS : false}
        onRequestClose={this.closeModal.bind(this, 'SETTINGS')}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
      >
        <SettingsContainer handleClose={this.closeModal.bind(this, 'SETTINGS')} />
      </Modal>
    );
  }

  render() {
    return (
      <div>
        {this.renderImportDeckModal()}
        {this.renderShortcutsModal()}
        {this.renderSettingsModal()}
        <KeyListener handlers={this.handlers} />
      </div>
    );
  }
}

ModalContainer.propTypes = propTypes;
ModalContainer.defaultProps = defaultProps;

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
