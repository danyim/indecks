import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/components/SignUpLoginForm.styl'

class SignUpLoginForm extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    signUpEmail: PropTypes.func.isRequired,
    signInGithub: PropTypes.func.isRequired, // eslint-disable-line
    signInTwitter: PropTypes.func.isRequired, // eslint-disable-line
    signInGoogle: PropTypes.func.isRequired, // eslint-disable-line
    isAuthenticating: PropTypes.bool,
  }

  static defaultProps = {
    isAuthenticating: false,
  }

  static providerMap = {
    GITHUB: 'signInGithub',
    TWITTER: 'signInTwitter',
    GOOGLE: 'signInGoogle',
  }

  state = {
    username: '',
    password: '',
    message: '',
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
    this.handleClickProviderAuth = this.handleClickProviderAuth.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleLoginClick(e) {
    e.preventDefault()

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ message: 'Username or password cannot be blank' })
      return
    }

    this.props.login(this.state.username, this.state.password).then(message => {
      if (message) {
        this.setState({ message })
      }
    })
  }

  handleSignUpClick(e) {
    e.preventDefault()

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ message: 'Username or password cannot be blank' })
      return
    }

    this.props.signUpEmail(this.state.username, this.state.password).then(message => {
      if (message) {
        this.setState({ message })
      }
    })
  }

  handleClickProviderAuth(e, provider = null) {
    e.preventDefault()

    if (!provider) {
      console.error('Provider cannot be blank')
      return
    }

    const providerSignIn = this.props[SignUpLoginForm.providerMap[provider]]

    providerSignIn()
      .then(message => {
        if (message) {
          this.setState({ message })
        }
      })
      .catch(err => {
        console.error('error while trying to log on with provider', provider, err)
      })
  }

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.error}>{this.state.message}</div>
        <label htmlFor="username">
          <span>Email</span>
          <input
            name="username"
            type="text"
            placeholder="jane.doe@gmail.com"
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="*********"
            onChange={this.handleChange}
          />
        </label>

        <div className={`${styles['control-buttons']}`}>
          <button
            name="login"
            type="button"
            className="button outline"
            disabled={this.props.isAuthenticating}
            onClick={this.handleLoginClick}
          >
            Login
          </button>
          <button
            name="signup"
            type="button"
            className="button"
            disabled={this.props.isAuthenticating}
            onClick={this.handleSignUpClick}
          >
            Sign up using email
          </button>
        </div>

        <div className="txt-center m-t">
          <p>or sign in using a provider below</p>
        </div>

        <div className={`${styles['control-buttons']}`}>
          <button
            type="button"
            className="button github"
            disabled={this.props.isAuthenticating}
            onClick={e => this.handleClickProviderAuth(e, 'GITHUB')}
          >
            <i className="fa fa-github fa-2x" />
            GitHub
          </button>
          <button
            type="button"
            className="button google"
            disabled={this.props.isAuthenticating}
            onClick={e => this.handleClickProviderAuth(e, 'GOOGLE')}
          >
            <i className="fa fa-google fa-2x" />
            Google
          </button>
          <button
            type="button"
            className="button twitter"
            disabled={this.props.isAuthenticating}
            onClick={e => this.handleClickProviderAuth(e, 'TWITTER')}
          >
            <i className="fa fa-twitter fa-2x" />
            Twitter
          </button>
        </div>
      </form>
    )
  }
}

export default SignUpLoginForm
