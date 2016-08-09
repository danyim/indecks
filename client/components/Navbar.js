import React from 'react';
import { Link, browserHistory } from 'react-router';
import styles from '../styles/components/Navbar';

const Navbar = React.createClass({
  routeParser(path) {
    let addLink, listLink;
    const routeComponents = path.split('/').filter(v => v !== '');

    // console.log('routeComponents', routeComponents);
    if(path === '/') {
      // @/
      addLink = (
        <Link to="/add" title="Add deck"><i className="fa fa-plus-square-o"></i></Link>
      );
      listLink = (
        //<Link to={`/`} title="View decks"><i className={`${styles['fa fa-navicon grid-icon']}`}></i></Link>
        <a href="javascript:void(0);" disabled><i className="fa fa-navicon"></i></a>
      );
    }
    else if(routeComponents[0] === 'view' && routeComponents.length === 2) {
      // @/view/:deckId
      addLink = (
        <Link to={`/add/${routeComponents[1]}`} title="Add card"><i className="fa fa-plus-square-o"></i></Link>
      );
      listLink = (
        <Link to={`/`} title="View decks"><i className="fa fa-navicon"></i></Link>
      );
    }
    else if(routeComponents[0] === 'add' && routeComponents.length === 2) {
      // @/add/:deckId
      addLink = (
        <Link to={`/add/${routeComponents[1]}`} title="Add card"><i className="fa fa-plus-square-o"></i></Link>
      );
      listLink = (
        <Link to={`/view/${routeComponents[1]}`} title="View cards"><i className="fa fa-navicon"></i></Link>
      );
    }
    else if(routeComponents[0] === 'view' && routeComponents.length === 3) {
      // @/view/:deckId/:cardId
      addLink = (
        <Link to={`/add/${routeComponents[1]}`} title="Add card"><i className="fa fa-plus-square-o"></i></Link>
      );
      listLink = (
        <Link to={`/view/${routeComponents[1]}`} title="View cards"><i className="fa fa-navicon"></i></Link>
      );
    }
    else if(routeComponents[0] === 'add' && routeComponents.length === 1) {
      // @/add
      addLink = (
        <a href="javascript:void(0);" disabled><i className="fa fa-plus-square-o"></i></a>
      );
      listLink = (
        <Link to={`/`} title="View decks"><i className="fa fa-navicon"></i></Link>
      );
    }
    else {
      addLink = (
        <a href="javascript:void(0);" disabled><i className="fa fa-plus-square-o"></i></a>
      );
      listLink = (
        <a href="javascript:void(0);" disabled><i className="fa fa-navicon"></i></a>
      );
    }

    return {
      addLink, listLink
    };
  },
  render() {
    let addLink, listLink;
    const routeParser = this.routeParser;

    browserHistory.listen(function(ev) {
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
          </div>
        </div>
      </nav>
    )
  }
});

export default Navbar;