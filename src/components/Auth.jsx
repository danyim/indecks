import React from 'react'
import PropTypes from 'prop-types'
import SignUpLoginForm from '../components/SignUpLoginForm'
import styles from '../styles/components/Auth.styl'

class Auth extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    saveDecksToFirebase: PropTypes.func.isRequired,
    username: PropTypes.string
  }

  static defaultProps = {
    username: ''
  }

  render () {
    return (
      <div className={styles.auth}>
        {
          !this.props.authenticated
          ? <SignUpLoginForm {...this.props} />
          : <div>
            <p>
              Logged in as&nbsp;<strong>{this.props.username}</strong>
            </p>
            <button
              type='button'
              className='btn'
              onClick={this.props.saveDecksToFirebase}
            >
              Save Decks
            </button>
            <button
              type='button'
              className='btn'
              onClick={this.props.logout}
            >
              Log out
            </button>
          </div>
        }

      </div>
    )
  }
}

export default Auth
