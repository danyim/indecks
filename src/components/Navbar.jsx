import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ModalTypes from './ModalTypes'
import styles from '../styles/components/Navbar.styl'

class Navbar extends React.Component {
  static propTypes = {
    changeActiveModal: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

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
    this.routeParser = this.routeParser.bind(this)
  }

  routeParser(path) {
    let addLink
    let listLink
    const routeComponents = path.split('/').filter(v => v !== '')

    if (path === '/') {
      // @/
      // addLink = Navbar.renderLink('/add', 'Add deck', 'fa-plus-square-o');
      addLink = Navbar.renderModalLink(
        () => this.props.changeActiveModal(ModalTypes.Import),
        'fa-plus-square-o'
      )
      listLink = Navbar.renderModalLink(
        () => this.props.changeActiveModal(ModalTypes.Settings),
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
      addLink = Navbar.renderNoAction()
      listLink = Navbar.renderLink('/', 'View decks', 'fa-th')
    } else if (routeComponents[0] === 'edit' && routeComponents.length === 3) {
      // @/edit/:deckId/:cardIndex
      addLink = Navbar.renderNoAction()
      listLink = Navbar.renderLink(
        `/view/${routeComponents[1]}`,
        'View cards',
        'fa-square-o'
      )
    } else {
      addLink = Navbar.renderModalLink(
        () => this.props.changeActiveModal(ModalTypes.Import),
        'fa-plus-square-o'
      )
      listLink = null
      // listLink = (
      //   <a href="javascript:void(0);" disabled><i className="fa fa-navicon"></i></a>
      // );
    }

    return {
      addLink,
      listLink,
    }
  }

  render() {
    const { addLink, listLink } = this.routeParser(this.props.location.pathname)

    return (
      <nav className={`${styles['nav-container']}`}>
        <div className={`${styles['nav-outer-container']}`}>
          <div className={`${styles['nav-inner-container']}`}>
            <span className={`${styles['nav-left']}`}>
              <div className={`${styles['rounded-button']}`}>{addLink}</div>
            </span>
            <h1>
              <Link to="/">
                in<span className={`${styles['title-bold']}`}>decks</span>
              </Link>
            </h1>
            <span className={`${styles['nav-right']}`}>
              <div className={`${styles['rounded-button']}`}>{listLink}</div>
            </span>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
