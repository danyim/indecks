import React from 'react'
import { shallow } from 'enzyme'
// import renderer from 'react-test-renderer';
import CardEdit from './CardEdit'
// import { CardEditForm } from './CardEditForm';

const defaultProps = {
  card: {
    title: '',
    answer: '',
    index: 0
  },
  cardIndex: 1,
  deckId: 'ABCDEFG',
  editCard: () => {},
  removeCard: () => {},
  form: {}
}

function setup(props = defaultProps) {
  const wrapper = shallow(<CardEdit {...props} />)

  return {
    props,
    wrapper
  }
}

describe('CardEdit', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('section.single').exists()).toBe(true)

    // const tree = renderer.create(
    //   <CardEdit {...defaultProps} />
    // ).toJSON();
    // expect(tree).toMatchSnapshot();
  })
})
