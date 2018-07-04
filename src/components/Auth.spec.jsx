import toJSON from 'enzyme-to-json'
import 'jest-styled-components' // eslint-disable-line
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import Auth from './Auth'

describe('Auth', () => {
  let props

  beforeEach(() => {
    props = {
      authenticated: false,
      displayName: '',
      email: '',
      isAuthenticating: false,
      logout: () => {},
      saveDecksToFirebase: () => {},
      fetchUserDecks: () => {},
      login: () => {},
      signUpEmail: () => {},
      signInGithub: () => {},
      signInTwitter: () => {},
      signInGoogle: () => {},
    }
  })

  it('should render self and subcomponents', () => {
    const { wrapper } = mount(Auth, props)
    const tree = toJSON(wrapper)
    expect(tree).toMatchSnapshot()
  })

  it('should show the signup/login form when not authenticated', () => {
    const { wrapper } = setupFull(Auth, {
      ...props,
      authenticated: false,
    })

    const form = wrapper.find('SignUpLoginForm')

    expect(form.exists()).toEqual(true)
  })

  it('should display the username or email when authenticated', () => {
    const { wrapper } = setupFull(Auth, {
      ...props,
      authenticated: true,
    })

    const subject = wrapper.find('p')

    expect(subject.exists()).toEqual(true)
    expect(subject.text()).toContain('Logged in as')
  })

  it('should display the displayName if available', () => {
    const { wrapper } = setupFull(Auth, {
      ...props,
      authenticated: true,
      displayName: 'test',
    })

    const subject = wrapper.find('strong')

    expect(subject.exists()).toEqual(true)
    expect(subject.text()).toContain('test')
  })

  it("should display the email if displayName isn't available", () => {
    const { wrapper } = setupFull(Auth, {
      ...props,
      authenticated: true,
      displayName: null,
      email: 'test@gmail.com',
    })

    const subject = wrapper.find('strong')

    expect(subject.exists()).toEqual(true)
    expect(subject.text()).toContain('test@gmail.com')
  })

  // it('should call handleClick when any selection is clicked', () => {
  //   const handler = jest.fn()
  //   const { wrapper } = setupFull(Auth, {
  //     ...props,
  //     handleClick: handler
  //   })

  //   const buttonLeft = wrapper.find('button').last()
  //   const buttonRight = wrapper.find('button').last()

  //   buttonLeft.simulate('click')
  //   expect(handler).toHaveBeenCalled()
  //   buttonRight.simulate('click')
  //   expect(handler).toHaveBeenCalledTimes(2)
  // })
})
