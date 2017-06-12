/* eslint-disable no-unused-vars */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { browserHistory } from 'react-router'
import renderer from 'react-test-renderer'
import CardView from './CardView'

const defaultProps = {
  card: {
    index: 1,
    title: 'Card',
    answer: 'Card description'
  },
  deck: {
    id: 'ABCDEFG',
    title: 'Deck title',
    description: 'Deck description',
    cards: [
      {
        index: 1,
        title: 'Card',
        answer: 'Card description'
      }
    ]
  },
  config: {
    shuffle: false
  },
  cardIndex: 1,
  toggleShuffle: () => {}
}

function setup (props = defaultProps) {
  const wrapper = shallow(<CardView {...props} />)

  return {
    props,
    wrapper
  }
}

function setupFull (props = defaultProps) {
  const wrapper = mount(<CardView {...props} />)

  return {
    props,
    wrapper
  }
}

describe('CardView', () => {
  it('should render self and subcomponents', () => {
    const tree = renderer.create(
      <CardView {...defaultProps} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it.skip('should advance to the next card when swiped left', () => {
    spyOn(browserHistory, 'push')
    const { wrapper } = setupFull()
    wrapper.find('Swipeable').simulate('swipedLeft') // Can't simulate swipe events :\
    expect(browserHistory.push).toHaveBeenCalled()
  })

  it('should flip the card when clicked', () => {
    const { wrapper } = setupFull()
    wrapper.find('Card').simulate('click')
    expect(wrapper.state('flipped')).toBe(true)
  })
})
