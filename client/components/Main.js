import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    return (
      <section>
        <nav className="nav-container">
          <div className="nav-outer-container">
            {/* Why is this div not centering? */}
            <div className="nav-inner-container">
              <h1>
                <Link to="/">in<span className="title-bold">decks</span></Link>
              </h1>
            </div>
          </div>
        </nav>
        <main className="main-container">
          { React.cloneElement(this.props.children, this.props)}
        </main>
        {/*
        <footer>
          <span className="credit">@danyim</span>
        </footer>
        */}
      </section>
    )
  }
});

export default Main;
