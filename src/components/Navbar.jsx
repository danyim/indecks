/**
 * Navbar badly needs a refactor. Currently it is handling all global shortcuts
 * and is the base component for the global modals to bind to, but technically
 * those modals should be separated from here.
 */

/* eslint react/jsx-no-bind: 1 */
import React from 'react'
// import Modal from 'react-modal'
import { Link, browserHistory } from 'react-router'
import DeckSelectorContainer from '../containers/DeckSelectorContainer'
import ImportDeckContainer from '../containers/ImportDeckContainer'
import SettingsContainer from '../containers/SettingsContainer'
import Modal from './Modal'
import KeyListener from './KeyListener'
import ShortcutHelper from './ShortcutHelper'
import ModalTypes from './ModalTypes'
import styles from '../styles/components/Navbar.styl'

// const modalTypes = [ModalTypes.Settings, ModalTypes.Import, ModalTypes.Shortcuts];

class Navbar extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  static renderLink(url, title, faClassName) {
    return (
      <Link to={url} title={title}>
        <i className={`fa ${faClassName}`} />
      </Link>
    )
  }

  static renderModalLink(openModalFn, faClassName) {
    return (
      <a onClick={openModalFn} className="pointer" role="presentation">
        <i className={`fa ${faClassName}`} />
      </a>
    )
  }

  static renderNoAction(faClassName = 'fa-plus-square-o') {
    return (
      <a disabled>
        <i className={`fa ${faClassName}`} />
      </a>
    )
  }

  constructor(props) {
    super(props)

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.routeParser = this.routeParser.bind(this)

    // TODO: Perhaps shortcut logic should be moved out into its own component
    // outside of the NavBar? It's only here because the NavBar is global.
    this.state = {
      openModals: {
        SETTINGS: false,
        IMPORT: false,
        SHORTCUTS: false,
        SELECTOR: false
      },
      currentModal: null
    }

    this.handlers = [
      {
        keyCode: 73, // 'i'
        action: this.openModal.bind(this, ModalTypes.Import)
      },
      {
        keyCode: 188, // ',' comma
        action: this.openModal.bind(this, ModalTypes.Settings)
      },
      {
        keyCode: 191, // '/' forward slash
        action: this.openModal.bind(this, ModalTypes.Shortcuts)
      },
      {
        keyCode: 83, // 's'
        action: this.openModal.bind(this, ModalTypes.Selector)
      }
    ]
  }

  closeModal() {
    this.setState({ currentModal: null })
  }

  openModal(modalType) {
    this.setState({ currentModal: modalType })
  }

  routeParser(path) {
    let addLink
    let listLink
    const routeComponents = path.split('/').filter(v => v !== '')

    if (path === '/') {
      // @/
      // addLink = Navbar.renderLink('/add', 'Add deck', 'fa-plus-square-o');
      addLink = Navbar.renderModalLink(
        this.openModal.bind(this, ModalTypes.Import),
        'fa-plus-square-o'
      )
      listLink = Navbar.renderModalLink(
        this.openModal.bind(this, ModalTypes.Settings),
        'fa-cog'
      )
      // listLink = Navbar.renderLink('/settings', ModalTypes.Settings, 'fa-cog');
      // <a href="javascript:void(0);" disabled><i className="fa fa-navicon"></i></a>
    } else if (routeComponents[0] === 'view' && routeComponents.length === 2) {
      // @/view/:deckId
      addLink = Navbar.renderLink(
        `/add/${routeComponents[1]}`,
        'Add card',
        'fa-plus-square-o'
      )
      listLink = Navbar.renderLink('/', 'View decks', 'fa-clone')
    } else if (routeComponents[0] === 'add' && routeComponents.length === 2) {
      // @/add/:deckId
      addLink = Navbar.renderLink(
        `/add/${routeComponents[1]}`,
        'Add card',
        'fa-plus-square-o'
      )
      listLink = Navbar.renderLink(
        `/view/${routeComponents[1]}`,
        'View cards',
        'fa-square-o'
      )
    } else if (routeComponents[0] === 'view' && routeComponents.length === 3) {
      // @/view/:deckId/:cardId
      addLink = Navbar.renderLink(
        `/add/${routeComponents[1]}`,
        'Add card',
        'fa-plus-square-o'
      )
      listLink = Navbar.renderLink(
        `/view/${routeComponents[1]}`,
        'View cards',
        'fa-square-o'
      )
    } else if (routeComponents[0] === 'add' && routeComponents.length === 1) {
      // @/add
      addLink = this.renderNoAction()
      listLink = Navbar.renderLink('/', 'View decks', 'fa-th')
    } else if (routeComponents[0] === 'edit' && routeComponents.length === 3) {
      // @/edit/:deckId/:cardIndex
      addLink = this.renderNoAction()
      listLink = Navbar.renderLink(
        `/view/${routeComponents[1]}`,
        'View cards',
        'fa-square-o'
      )
    } else {
      addLink = Navbar.renderModalLink(
        this.openModal.bind(this, ModalTypes.Import),
        'fa-plus-square-o'
      )
      listLink = null
      // listLink = (
      //   <a href="javascript:void(0);" disabled><i className="fa fa-navicon"></i></a>
      // );
    }

    return {
      addLink,
      listLink
    }
  }

  renderImportDeckModal() {
    return (
      <Modal
        isOpen={this.state.currentModal === ModalTypes.Import}
        onRequestClose={this.closeModal}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
        contentLabel="Import Deck"
      >
        <ImportDeckContainer handleClose={this.closeModal} />
      </Modal>
    )
  }

  renderShortcutsModal() {
    return (
      <Modal
        isOpen={this.state.currentModal === ModalTypes.Shortcuts}
        onRequestClose={this.closeModal}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
        contentLabel="Keyboard Shortcuts"
      >
        <ShortcutHelper handleClose={this.closeModal} />
      </Modal>
    )
  }

  renderSettingsModal() {
    return (
      <Modal
        isOpen={this.state.currentModal === ModalTypes.Settings}
        onRequestClose={this.closeModal}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
        contentLabel="Settings"
      >
        <SettingsContainer handleClose={this.closeModal} />
      </Modal>
    )
  }

  renderDeckSelectorModal() {
    return (
      <Modal
        isOpen={this.state.currentModal === ModalTypes.Selector}
        onRequestClose={this.closeModal}
        className={`${styles['modal-content']}`}
        overlayClassName={`${styles['modal-overlay']}`}
        contentLabel="Import Deck"
      >
        <DeckSelectorContainer handleClose={this.closeModal} />
      </Modal>
    )
  }

  render() {
    let addLink
    let listLink
    const routeParser = this.routeParser

    browserHistory.listen(ev => {
      const { addLink: add, listLink: list } = routeParser(ev.pathname)
      addLink = add
      listLink = list
    })

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
              <Link to="/">
                in<span className={`${styles['title-bold']}`}>decks</span>
              </Link>
            </h1>
            <span className={`${styles['nav-right']}`}>
              <div className={`${styles['rounded-button']}`}>
                {listLink}
              </div>
            </span>
            {this.renderImportDeckModal()}
            {this.renderShortcutsModal()}
            {this.renderSettingsModal()}
            {this.renderDeckSelectorModal()}
          </div>
        </div>
        <KeyListener handlers={this.handlers} />
      </nav>
    )
  }
}

export default Navbar
