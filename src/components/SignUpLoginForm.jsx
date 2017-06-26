import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/components/SignUpLoginForm.styl'

class SignUpLoginForm extends React.Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    signupEmail: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }

  static defaultProps = {}

  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange (e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleLoginClick (e) {
    e.preventDefault()

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ message: 'Username or password cannot be blank' })
      return
    }

    this.props.login(
      this.state.username,
      this.state.password
    ).then((message) => {
      if (message) {
        this.setState({ message })
      }
    })
  }

  handleSignUpClick (e) {
    e.preventDefault()

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ message: 'Username or password cannot be blank' })
      return
    }

    this.props.signupEmail(
      this.state.username,
      this.state.password
    ).then((message) => {
      if (message) {
        this.setState({ message })
      }
    })
  }

  render () {
    return (
      <form className={styles.form}>
        <div className={styles.error}>{this.state.message}</div>
        <input
          name='username'
          type='text'
          placeholder='jane@gmail.com'
          onChange={this.handleChange}
        />
        <input
          name='password'
          type='password'
          onChange={this.handleChange}
        />

        <div className={`${styles['control-buttons']}`}>
          <button
            type='button'
            className='button'
            disabled={this.props.isAuthenticating}
            onClick={this.handleLoginClick}
          >
            Login
          </button>
          <button
            type='button'
            className='button'
            disabled={this.props.isAuthenticating}
            onClick={this.handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </form>
    )
  }
}

export default SignUpLoginForm
