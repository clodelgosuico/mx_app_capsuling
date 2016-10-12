import Component from '../src/client/js/Component.jsx';
import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

var component;
var spy = sinon.spy();

describe('Given an instance of the Component', () => {
  describe('when we render the component', () => {
    before(() => {
      component = TestUtils.renderIntoDocument(<Component onRender={ spy } />);
    });
    it('should render a div', () => {
      var div = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div');

      expect(div).to.have.length.above(0, 'Expected to have element with tag <div>');
      expect(spy).to.be.calledOnce;
    });
  });
});
