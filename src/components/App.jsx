import React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import ModalContainer from './ModalContainer'

class App extends React.Component {
  static propTypes = {
    changeActiveModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node,
    currentModal: PropTypes.string
  }

  static defaultProps = {
    currentModal: null,
    children: null
  }

  render() {
    return (
      <div>
        <ModalContainer
          currentModal={this.props.currentModal}
          changeActiveModal={this.props.changeActiveModal}
          closeModal={this.props.closeModal}
        />
        <Navbar changeActiveModal={this.props.changeActiveModal} />
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
