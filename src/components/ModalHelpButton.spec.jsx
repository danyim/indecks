import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../testUtils' // eslint-disable-line no-unused-vars
import ModalHelpButton from './ModalHelpButton'

describe('ModalHelpButton', () => {
  let props

  beforeEach(() => {
    props = {
      children: <div />,
      style: null
    }
  })

  it('should render self and subcomponents', () => {
    const wrapper = shallow(ModalHelpButton, props)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should toggle the help modal open/close when the icon is clicked', () => {
    const testDOM = <div className="test-dom">Test</div>
    const { wrapper } = setup(ModalHelpButton, {
      ...props,
      children: testDOM
    })

    const toggleModalIcon = wrapper.find('span[name="toggle-modal-icon"]')
    const toggle = () => {
      toggleModalIcon.simulate('click', {
        nativeEvent: {
          x: 100,
          y: 100
        }
      })
    }

    expect(wrapper.state().open).toBe(false)
    toggle()
    expect(wrapper.state().open).toBe(true)
    toggle()
    expect(wrapper.state().open).toBe(false)
  })

  it('should close the modal when close is clicked', () => {
    const { wrapper } = setup(ModalHelpButton, props)

    const toggleModalIcon = wrapper.find('span[name="toggle-modal-icon"]')
    const toggle = () => {
      toggleModalIcon.simulate('click', {
        nativeEvent: {
          x: 100,
          y: 100
        }
      })
    }
    const closeButton = wrapper.find('a.close-modal')
    toggle()
    expect(wrapper.state().open).toBe(true)
    closeButton.simulate('click')
    expect(wrapper.state().open).toBe(false)
  })

  it('should render the contents of its children', () => {
    const testDOM = <div className="test-dom">Test</div>
    const { wrapper } = setup(ModalHelpButton, {
      ...props,
      children: testDOM
    })

    const dom = wrapper.find('div.test-dom')
    expect(dom.exists()).toBe(true)
  })
})
