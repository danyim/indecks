import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import Navbar from './Navbar'

describe('Navbar', () => {
  let props

  beforeEach(() => {
    props = {
      changeActiveModal: () => {},
      location: {
        pathname: '/'
      }
    }
  })

  it('should render self and subcomponents', () => {
    const wrapper = shallow(Navbar, props)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
