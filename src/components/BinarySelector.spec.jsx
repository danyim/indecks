import toJSON from 'enzyme-to-json'
import 'jest-styled-components' // eslint-disable-line
import { shallow, mount, setup, setupFull } from '../test/utils' // eslint-disable-line no-unused-vars
import BinarySelector from './BinarySelector'

const defaultProps = {
  leftLabel: '',
  rightLabel: '',
  selection: 1,
  containerStyle: null,
  buttonStyle: null,
  handleClick: () => {}
}

describe('BinarySelector', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = mount(BinarySelector, defaultProps)
    const tree = toJSON(wrapper)
    expect(tree).toMatchStyledComponentsSnapshot()
  })

  it('should correctly highlight the selected value', () => {
    let { wrapper } = setupFull(BinarySelector, {
      ...defaultProps,
      selection: 2
    })

    const button = wrapper.find('button')
    const buttonSelected = wrapper.find('button[selected=true]')
    const buttonLeft = wrapper.find('button').last()
    const buttonRight = wrapper.find('button').last()

    expect(button.length).toEqual(2)
    expect(buttonSelected.exists()).toEqual(true)
    expect(buttonSelected.html()).toEqual(buttonRight.html())

    wrapper = setupFull(BinarySelector, {
      ...defaultProps,
      selection: 1
    }).wrapper

    expect(buttonSelected.html()).toEqual(buttonLeft.html())
  })

  it('should call handleClick when any selection is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setupFull(BinarySelector, {
      ...defaultProps,
      handleClick: handler
    })

    const buttonLeft = wrapper.find('button').last()
    const buttonRight = wrapper.find('button').last()

    buttonLeft.simulate('click')
    expect(handler).toHaveBeenCalled()
    buttonRight.simulate('click')
    expect(handler).toHaveBeenCalledTimes(2)
  })
})
