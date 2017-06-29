import React from 'react'
import PropTypes from 'prop-types'
import SignUpLoginForm from '../components/SignUpLoginForm'
import styles from '../styles/components/Auth.styl'

class Auth extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    saveDecksToFirebase: PropTypes.func.isRequired,
    fetchUserDecks: PropTypes.func.isRequired,
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string
  }

  static defaultProps = {
    photoURL: null,
    displayName: null,
    email: null
  }

  constructor (props) {
    super(props)

    this.handleClickSaveDecks = this.handleClickSaveDecks.bind(this)
  }

  handleClickSaveDecks () {
    this.props.saveDecksToFirebase()
    .then(() => {
      // console.log('saved all decks to firebase!')
    })
    .catch(() => {
      // console.log('error occurred while saving to firebase')
    })
  }

  render () {
    return (
      <div className={styles.auth}>
        {
          !this.props.authenticated
          ? <SignUpLoginForm {...this.props} />
          : <div>
            <p>
              {
                this.props.photoURL
                ? <img src={this.props.photoURL} alt='Avatar' />
                : null
              }
              Logged in as&nbsp;
              <strong>
                {
                  this.props.displayName
                  ? this.props.displayName
                  : this.props.email
                }
              </strong>
            </p>
            <button
              type='button'
              className='btn'
              onClick={this.props.saveDecksToFirebase}
            >
              Save your decks
            </button>
            <button
              type='button'
              className='btn'
              onClick={this.props.fetchUserDecks}
            >
              Reload decks from account
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
