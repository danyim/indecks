import toJSON from 'enzyme-to-json'
import 'jest-styled-components' // eslint-disable-line
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import App from './App'

describe('App', () => {
  let props

  beforeEach(() => {
    props = {
      changeActiveModal: () => {},
      closeModal: () => {},
      push: () => {},
      location: {
        pathname: '/'
      },
      children: null,
      currentModal: ''
    }
  })

  it('should render self and subcomponents', () => {
    const { wrapper } = shallow(App, props)
    const tree = toJSON(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
