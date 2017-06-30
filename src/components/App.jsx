import React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  render() {
    return (
      <div>
        <Navbar />
        <main className="main-container">
          {/* React.cloneElement(this.props.children, this.props) */}
          {this.props.children}
        </main>
        <footer>
          <p>
            <a
              href="https://github.com/danyim/indecks"
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub repository"
            >
              <i className="fa fa-github" />
            </a>
          </p>
        </footer>
      </div>
    )
  }
}

export default App
