import React from 'react';
import Navbar from './Navbar';

const propTypes = {
  children: React.PropTypes.object.isRequired
};

const defaultProps = {};

const App = props => (
  <div>
    <Navbar />
    <main className="main-container">
      {/* React.cloneElement(this.props.children, this.props) */}
      {props.children}
    </main>
    <footer>
      <p>
        dyim_2016 |
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
