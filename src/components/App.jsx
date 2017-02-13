import React from 'react';
import KeyBinder from './KeyBinder'
import Navbar from './Navbar'
import ModalContainer from '../containers/ModalContainer'

const propTypes = {
  children: React.PropTypes.object.isRequired
};

const defaultProps = {};

const App = props => (
  <div>
    <KeyBinder>
      <ModalContainer>
        <Navbar />
        <main className="main-container">
          {/* React.cloneElement(props.children, props) */}
          {props.children}
        </main>
      </ModalContainer>
    </KeyBinder>
    <footer>
      <p>dyim_2016 |
        <a
          href="https://github.com/danyim/indecks"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github" />
        </a>
      </p>
    </footer>
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
