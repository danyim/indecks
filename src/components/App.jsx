import React from 'react';
import KeyBinder from './KeyBinder'
import Navbar from './Navbar'
import ModalContainer from '../containers/ModalContainer'

class App extends React.Component {
  render() {
    return (
      <div>
        <KeyBinder>
          <ModalContainer>
            <Navbar />
            <main className="main-container">
              {/* React.cloneElement(this.props.children, this.props) */}
              {this.props.children}
            </main>
          </ModalContainer>
        </KeyBinder>
        <footer>
          <p>dyim_2016 | <a href="https://github.com/danyim/indecks" target="_blank"><i className="fa fa-github"></i></a></p>
        </footer>
      </div>
    )
  }
}

export default App;
