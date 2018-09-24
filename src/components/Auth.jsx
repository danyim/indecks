import React from 'react'
import PropTypes from 'prop-types'
import SignUpLoginForm from '../components/SignUpLoginForm'
import styles from '../styles/components/Auth.styl'

class Auth extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    saveDecksToFirebase: PropTypes.func.isRequired,
    displayName: PropTypes.string,
    email: PropTypes.string,
    isAuthenticating: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    fetchUserDecks: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    signUpEmail: PropTypes.func.isRequired,
    signInGithub: PropTypes.func.isRequired, // eslint-disable-line
    signInTwitter: PropTypes.func.isRequired, // eslint-disable-line
    signInGoogle: PropTypes.func.isRequired, // eslint-disable-line
    // photoURL: PropTypes.string,
  }

  static defaultProps = {
    isAuthenticating: false,
    authenticated: false,
    displayName: null,
    email: null,
    // photoURL: null,
  }

  render() {
    return (
      <div className={styles.auth}>
        {!this.props.authenticated ? (
          <SignUpLoginForm
            isAuthenticating={this.props.isAuthenticating}
            login={this.props.login}
            signUpEmail={this.props.signUpEmail}
            signInGithub={this.props.signInGithub}
            signInTwitter={this.props.signInTwitter}
            signInGoogle={this.props.signInGoogle}
          />
        ) : (
          <div>
            <p>
              {/*
                this.props.photoURL
                ? <img src={this.props.photoURL} alt='Avatar' />
                : null
              */}
              Logged in as&nbsp;
              <strong>{this.props.displayName ? this.props.displayName : this.props.email}</strong>
            </p>
            <button type="button" className="btn" onClick={this.props.saveDecksToFirebase}>
              Save your decks
            </button>
            <button type="button" className="btn" onClick={this.props.fetchUserDecks}>
              Reload decks from account
            </button>
            <button type="button" className="button outline" onClick={this.props.logout}>
              Log out
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Auth
