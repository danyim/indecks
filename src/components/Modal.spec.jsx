import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow, mount, setup, setupFull } from '../testUtils' // eslint-disable-line no-unused-vars
import Modal from './Modal'

const defaultProps = {
  onRequestClose: () => {},
  isOpen: false,
  children: <div />,
  contentLabel: 'Test modal',
  style: null,
  onAfterOpen: null,
  className: null,
  overlayClassName: null
}

describe('Modal', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(Modal, defaultProps)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should close the modal when close is clicked', () => {
    const handler = jest.fn()
    const { wrapper } = setup(Modal, {
      ...defaultProps,
      onRequestClose: handler
    })

    const closeButton = wrapper.find('a.close-modal')
    closeButton.simulate('click')
    expect(handler.mock.calls.length).toEqual(1)
  })

  it('should render the contents of its children', () => {
    const testDOM = <div className="test-dom">Test</div>
    const { wrapper } = setup(Modal, {
      ...defaultProps,
      children: testDOM
    })

    const dom = wrapper.find('div.test-dom')
    expect(dom.exists()).toBe(true)
  })
})
