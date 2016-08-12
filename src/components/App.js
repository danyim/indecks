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
          <p>dyim_2016</p>
        </footer>
      </div>
    )
  }
}

export default App;
