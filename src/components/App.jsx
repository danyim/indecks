/* @flow */
import * as React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import ModalContainer from './ModalContainer'
import type { Location } from 'react-router-dom'

type Props = {
  changeActiveModal: *,
  closeModal: PropTypes.func.isRequired,
  push: string => void,
  location: Location,
  children: React.Node,
  currentModal: string,
}

class App extends React.Component<Props> {
  static defaultProps = {
    currentModal: null,
    children: null,
  }

  componentDidMount() {
    if (window) {
      window.scrollTo(0, 1)
    }
    //   if (!this.props.isAuthenticated()) {
    //     this.props.changeActiveModal('SPLASH')
    //   }
  }

  render() {
    return (
      <main className="app-container">
        <Navbar changeActiveModal={this.props.changeActiveModal} location={this.props.location} />
        <ModalContainer
          currentModal={this.props.currentModal}
          changeActiveModal={this.props.changeActiveModal}
          closeModal={this.props.closeModal}
          push={this.props.push}
        />
        <section className="main-container">{this.props.children}</section>
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
      </main>
    )
  }
}

export default App
