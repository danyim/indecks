import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/components/SignUpLoginForm.styl'

class SignUpLoginForm extends React.Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    signUpEmail: PropTypes.func.isRequired,
    signInGithub: PropTypes.func.isRequired,
    signInTwitter: PropTypes.func.isRequired,
    signInGoogle: PropTypes.func.isRequired
  }

  static defaultProps = {}

  static providerMap = {
    GITHUB: 'signInGithub',
    TWITTER: 'signInTwitter',
    GOOGLE: 'signInGoogle'
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
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

    this.props
      .signUpEmail(this.state.username, this.state.password)
      .then(message => {
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
        console.log('error while trying to log on with provider', provider, err)
      })
  }

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.error}>
          {this.state.message}
        </div>
        <input
          name="username"
          type="text"
          placeholder="jane@gmail.com"
          onChange={this.handleChange}
        />
        <input name="password" type="password" onChange={this.handleChange} />

        <div className={`${styles['control-buttons']}`}>
          <button
            type="button"
            className="button"
            disabled={this.props.isAuthenticating}
            onClick={this.handleLoginClick}
          >
            Login
          </button>
          <button
            type="button"
            className="button"
            disabled={this.props.isAuthenticating}
            onClick={this.handleSignUpClick}
          >
            Sign up using email
          </button>
        </div>

        <div className="txt-center m-t">
          <p>or sign up with a provider below</p>
        </div>

        <div className={`${styles['control-buttons']}`}>
          <button
            type="button"
            className="button"
            disabled={this.props.isAuthenticating}
            onClick={e => this.handleClickProviderAuth(e, 'GITHUB')}
          >
            <i className="fa fa-github" /> GitHub Sign In
          </button>
          <button
            type="button"
            className="button"
            disabled={this.props.isAuthenticating}
            onClick={e => this.handleClickProviderAuth(e, 'GOOGLE')}
          >
            <i className="fa fa-google" /> Google Sign In
          </button>
          <button
            type="button"
            className="button"
            disabled={this.props.isAuthenticating}
            onClick={e => this.handleClickProviderAuth(e, 'TWITTER')}
          >
            <i className="fa fa-twitter" /> Twitter Sign In
          </button>
        </div>
      </form>
    )
  }
}

export default SignUpLoginForm
