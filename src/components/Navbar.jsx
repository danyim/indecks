import React from 'react';
import Modal from 'react-modal';
import { Link, browserHistory } from 'react-router';
import ImportDeckContainer from '../containers/ImportDeckContainer';
import SettingsContainer from '../containers/SettingsContainer';
import KeyListener from './KeyListener';
import ShortcutHelper from './ShortcutHelper';
import styles from '../styles/components/Navbar';

const propTypes = {};

const defaultProps = {};

const modalTypes = ['SETTINGS', 'IMPORT', 'SHORTCUTS'];

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.routeParser = this.routeParser.bind(this);

    // TODO: Perhaps shortcut logic should be moved out into its own component
    // outside of the NavBar? It's only here because the NavBar is global.
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

  routeParser(path) {
    let addLink;
    let listLink;
    const routeComponents = path.split('/').filter(v => v !== '');

    if (path === '/') {
      // @/
      // addLink = this.renderLink('/add', 'Add deck', 'fa-plus-square-o');
      addLink = this.renderModalLink(this.openModal.bind(this, 'IMPORT'), 'fa-plus-square-o');
      listLink = this.renderModalLink(this.openModal.bind(this, 'SETTINGS'), 'fa-cog');
      // listLink = this.renderLink('/settings', 'Settings', 'fa-cog');
      // <a href="javascript:void(0);" disabled><i className="fa fa-navicon"></i></a>
    } else if (routeComponents[0] === 'view' && routeComponents.length === 2) {
      // @/view/:deckId
      addLink = this.renderLink(`/add/${routeComponents[1]}`, 'Add card', 'fa-plus-square-o');
      listLink = this.renderLink('/', 'View decks', 'fa-clone');
    } else if (routeComponents[0] === 'add' && routeComponents.length === 2) {
      // @/add/:deckId
      addLink = this.renderLink(`/add/${routeComponents[1]}`, 'Add card', 'fa-plus-square-o');
      listLink = this.renderLink(`/view/${routeComponents[1]}`, 'View cards', 'fa-square-o');
    } else if (routeComponents[0] === 'view' && routeComponents.length === 3) {
      // @/view/:deckId/:cardId
      addLink = this.renderLink(`/add/${routeComponents[1]}`, 'Add card', 'fa-plus-square-o');
      listLink = this.renderLink(`/view/${routeComponents[1]}`, 'View cards', 'fa-square-o');
    } else if (routeComponents[0] === 'add' && routeComponents.length === 1) {
      // @/add
      addLink = this.renderNoAction();
      listLink = this.renderLink('/', 'View decks', 'fa-th');
    } else if (routeComponents[0] === 'edit' && routeComponents.length === 3) {
      // @/edit/:deckId/:cardIndex
      addLink = this.renderNoAction();
      listLink = this.renderLink(`/view/${routeComponents[1]}`, 'View cards', 'fa-square-o');
    } else {
      addLink = this.renderModalLink(this.openModal.bind(this, 'IMPORT'), 'fa-plus-square-o');
      listLink = null;
      // listLink = (
      //   <a href="javascript:void(0);" disabled><i className="fa fa-navicon"></i></a>
      // );
    }

    return {
      addLink,
      listLink
    };
  }

  renderImportDeckModal() {
    return (
      <Modal
        isOpen={this.state.openModals.IMPORT}
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
        isOpen={this.state.openModals.SHORTCUTS ? this.state.openModals.SHORTCUTS : null}
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
        isOpen={this.state.openModals.SETTINGS ? this.state.openModals.SETTINGS : null}
        onRequestClose={this.closeModal.bind(this, 'SETTINGS')}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
      >
        <SettingsContainer handleClose={this.closeModal.bind(this, 'SETTINGS')} />
      </Modal>
    );
  }

  renderLink(url, title, faClassName) {
    return (
      <Link to={url} title={title}>
        <i className={`fa ${faClassName}`} />
      </Link>
    );
  }

  renderModalLink(openModalFn, faClassName) {
    return (
      <a onClick={openModalFn} className="pointer">
        <i className={`fa ${faClassName}`} />
      </a>
    );
  }

  renderNoAction(faClassName = 'fa-plus-square-o') {
    return (
      <a href="javascript:void(0);" disabled>
        <i className={`fa ${faClassName}`} />
      </a>
    );
  }

  render() {
    let addLink;
    let listLink;
    const routeParser = this.routeParser;

    browserHistory.listen(ev => {
      const { addLink: add, listLink: list } = routeParser(ev.pathname);
      addLink = add;
      listLink = list;
    });

    return (
      <nav className={`${styles['nav-container']}`}>
        <div className={`${styles['nav-outer-container']}`}>
          <div className={`${styles['nav-inner-container']}`}>
            <span className={`${styles['nav-left']}`}>
              <div className={`${styles['rounded-button']}`}>
                {addLink}
              </div>
            </span>
            <h1>
              <Link to="/">in<span className={`${styles['title-bold']}`}>decks</span></Link>
            </h1>
            <span className={`${styles['nav-right']}`}>
              <div className={`${styles['rounded-button']}`}>
                {listLink}
              </div>
            </span>
            {this.renderImportDeckModal()}
            {this.renderShortcutsModal()}
            {this.renderSettingsModal()}
          </div>
        </div>
        <KeyListener handlers={this.handlers} />
      </nav>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
