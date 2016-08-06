import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar'

const Main = React.createClass({
  render() {
    return (
      <section>
        <Navbar />
        <main className="main-container">
          { React.cloneElement(this.props.children, this.props)}
        </main>
        <footer>
          <p>dyim_2016</p>
        </footer>
        {/*
        */}
      </section>
    )
  }
});

export default Main;
