import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import SignUpLoginForm from './SignUpLoginForm'

describe('SignUpLoginForm', () => {
  let props

  beforeEach(() => {
    props = {
      login: () => {},
      signUpEmail: () => {},
      signInGithub: () => {},
      signInTwitter: () => {},
      signInGoogle: () => {},
      isAuthenticating: false,
    }
  })

  it('should render self and subcomponents', () => {
    const wrapper = shallow(SignUpLoginForm, props)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should display the form elements', () => {
    const { wrapper } = setup(SignUpLoginForm, props)

    const inputEmail = wrapper.find('input[name="username"]')
    const inputPass = wrapper.find('input[name="password"]')

    expect(inputEmail.exists()).toBe(true)
    expect(inputPass.exists()).toBe(true)
  })

  it('should call login if Login is clicked', () => {
    const username = 'testEmail@test.com'
    const password = 'test_pass'

    const handler = jest.fn().mockReturnValue({ then: () => {} })
    const { wrapper } = setup(SignUpLoginForm, {
      ...props,
      login: handler,
    })

    const inputEmail = wrapper.find('input[name="username"]')
    const inputPass = wrapper.find('input[name="password"]')
    const buttonLogin = wrapper.find('button[name="login"]')

    inputEmail.simulate('change', {
      target: { value: username, name: 'username' },
    })
    inputPass.simulate('change', {
      target: { value: password, name: 'password' },
    })
    buttonLogin.simulate('click', { preventDefault: () => {} })
    expect(handler).toHaveBeenCalled()
  })

  it('should call signUpEmail if signup is clicked', () => {
    const username = 'testEmail@test.com'
    const password = 'test_pass'

    const handler = jest.fn().mockReturnValue({ then: () => {} })
    const { wrapper } = setup(SignUpLoginForm, {
      ...props,
      signUpEmail: handler,
    })

    const inputEmail = wrapper.find('input[name="username"]')
    const inputPass = wrapper.find('input[name="password"]')
    const buttonSignup = wrapper.find('button[name="signup"]')

    inputEmail.simulate('change', {
      target: { value: username, name: 'username' },
    })
    inputPass.simulate('change', {
      target: { value: password, name: 'password' },
    })
    buttonSignup.simulate('click', { preventDefault: () => {} })
    expect(handler).toHaveBeenCalled()
  })

  it('should call signInGithub if the Github provider button is clicked', () => {
    const handler = jest
      .fn()
      .mockReturnValue({ then: () => ({ catch: () => {} }) })
    const { wrapper } = setup(SignUpLoginForm, {
      ...props,
      signInGithub: handler,
    })

    const button = wrapper.find('button.github')

    button.simulate('click', { preventDefault: () => {} })
    expect(handler).toHaveBeenCalled()
  })

  it('should call signInTwitter if the Twitter provider button is clicked', () => {
    const handler = jest
      .fn()
      .mockReturnValue({ then: () => ({ catch: () => {} }) })
    const { wrapper } = setup(SignUpLoginForm, {
      ...props,
      signInTwitter: handler,
    })

    const button = wrapper.find('button.twitter')

    button.simulate('click', { preventDefault: () => {} })
    expect(handler).toHaveBeenCalled()
  })

  it('should call signInGoogle if the Google provider button is clicked', () => {
    const handler = jest
      .fn()
      .mockReturnValue({ then: () => ({ catch: () => {} }) })
    const { wrapper } = setup(SignUpLoginForm, {
      ...props,
      signInGoogle: handler,
    })

    const button = wrapper.find('button.google')

    button.simulate('click', { preventDefault: () => {} })
    expect(handler).toHaveBeenCalled()
  })

  describe('Validation', () => {
    let handler
    const username = 'testEmail@test.com'
    const password = 'test_pass'
    const testButtons = [
      {
        title: 'logging in',
        selector: 'button[name="signup"]',
      },
      {
        title: 'signing up',
        selector: 'button[name="signup"]',
      },
    ]

    beforeEach(() => {
      handler = jest.fn().mockReturnValue({ then: () => {} })
    })

    testButtons.forEach(testButton => {
      it(`should not allow empty usernames for the username and password when ${
        testButton.title
      }`, () => {
        const { wrapper } = setup(SignUpLoginForm, {
          ...props,
          signUpEmail: handler,
        })

        const button = wrapper.find(testButton.selector)

        // Empty form
        button.simulate('click', { preventDefault: () => {} })
        expect(handler).not.toHaveBeenCalled()
        expect(wrapper.state('message') !== '').toBe(true)
      })

      it(`should not allow empty passwords when ${testButton.title}`, () => {
        const { wrapper } = setup(SignUpLoginForm, {
          ...props,
          signUpEmail: handler,
        })

        const inputEmail = wrapper.find('input[name="username"]')
        const button = wrapper.find(testButton.selector)

        inputEmail.simulate('change', {
          target: { value: username, name: 'username' },
        })
        button.simulate('click', { preventDefault: () => {} })
        expect(handler).not.toHaveBeenCalled()
        expect(wrapper.state('message') !== '').toBe(true)
      })

      it(`should not allow empty usernames when ${testButton.title}`, () => {
        const { wrapper } = setup(SignUpLoginForm, {
          ...props,
          signUpEmail: handler,
        })

        const inputPass = wrapper.find('input[name="password"]')
        const button = wrapper.find(testButton.selector)

        inputPass.simulate('change', {
          target: { value: password, name: 'password' },
        })
        button.simulate('click', { preventDefault: () => {} })
        expect(handler).not.toHaveBeenCalled()
        expect(wrapper.state('message') !== '').toBe(true)
      })
    })
  })
})
