import React from 'react';
import Navbar from './Navbar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <main className="main-container">
          {/* React.cloneElement(this.props.children, this.props) */}
          {this.props.children}
        </main>
        <footer>
          <p>dyim_2016 | <a href="https://github.com/danyim/indecks" target="_blank"><i className="fa fa-github"></i></a></p>
        </footer>
      </div>
    )
  }
}

export default App;
