/*
  Not sure if we want to use this yet in our tests...
  TODO: Find a definitive structure for Jest tests and follow it.
 */
import React from 'react'
import { shallow as shallowEnzyme, mount as mountEnzyme } from 'enzyme'

export const shallow = (Component, props) =>
  shallowEnzyme(<Component {...props} />)

export const mount = (Component, props) => mountEnzyme(<Component {...props} />)

export const setup = (Component, props) => {
  const wrapper = shallowEnzyme(<Component {...props} />)

  return {
    props,
    wrapper
  }
}

export const setupFull = (Component, props) => {
  const wrapper = mountEnzyme(<Component {...props} />)

  return {
    props,
    wrapper
  }
}
