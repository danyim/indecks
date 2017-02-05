import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import Card from 'src/components/Card';

describe('Card', () => {
  const card = {
    title: 'Test Card Title',
    answer: 'Test answer for test card.'
  };

  describe('render', () => {
    it('should render a Card', () => {
      //exercise: render the data into a component
      // const item = shallow(<Card card={card} />);
      let cardComponent = TestUtils.renderIntoDocument(<Card card={card}/>);
      expect(cardComponent.getInitials()).to.eql('JD');

      // //verify: rendered DOM values are what we expect
      // chai.assert(item.hasClass('list-item'));
      // chai.assert(item.hasClass('checked'));
      // chai.assert.equal(
      //   item.find('input[type="text"]').prop('defaultValue'),
      //   'Embrace the Ecosystem'
      // );
    });
  });
});
