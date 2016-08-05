import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    return (
      <div>
        <header>
          <h1 className="header">
            <Link to="/">in<span className="title-bold">decks</span></Link>
          </h1>
        </header>
        { React.cloneElement(this.props.children, this.props)}
        <footer>
          <span className="credit">@danyim</span>
        </footer>
      </div>
    )
  }
});

export default Main;
