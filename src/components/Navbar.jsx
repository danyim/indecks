import React from 'react';
import Modal from 'react-modal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link, browserHistory } from 'react-router';
import ImportDeckContainer from '../containers/ImportDeckContainer';
import SettingsContainer from '../containers/SettingsContainer';
import styles from '../styles/components/Navbar';

const propTypes = {};

const defaultProps = {};

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.openImportDeckModal = this.openImportDeckModal.bind(this);
    this.closeImportDeckModal = this.closeImportDeckModal.bind(this);
    this.openSettingsModal = this.openSettingsModal.bind(this);
    this.closeSettingsModal = this.closeSettingsModal.bind(this);
    this.routeParser = this.routeParser.bind(this);

    this.state = { isImportDeckModalOpen: false };
  }

  openImportDeckModal() {
    this.setState({ isImportDeckModalOpen: true });
  }

  closeImportDeckModal() {
    this.setState({ isImportDeckModalOpen: false });
  }

  openSettingsModal() {
    this.setState({ isSettingsModalOpen: true });
  }

  closeSettingsModal() {
    this.setState({ isSettingsModalOpen: false });
  }

  routeParser(path) {
    let addLink;
    let listLink;
    const routeComponents = path.split('/').filter(v => v !== '');

    if (path === '/') {
      // @/
      // addLink = this.renderLink('/add', 'Add deck', 'fa-plus-square-o');
      addLink = this.renderModalLink(this.openImportDeckModal, 'fa-plus-square-o');
      listLink = this.renderModalLink(this.openSettingsModal, 'fa-cog');
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
      addLink = this.renderNoAction();
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

  renderSettingsModal() {
    return (
      <Modal
        isOpen={this.state.isSettingsModalOpen}
        onRequestClose={this.closeSettingsModal}
        className={`${styles['modal-import-deck']}`}
      >
        <SettingsContainer handleClose={this.closeSettingsModal} />
      </Modal>
    );
  }

  renderImportDeckModal() {
    return (
      <Modal
        isOpen={this.state.isImportDeckModalOpen}
        onRequestClose={this.closeImportDeckModal}
        className={`${styles['modal-import-deck']}`}
      >
        <ImportDeckContainer handleClose={this.closeImportDeckModal} />
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
            {this.renderSettingsModal()}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
