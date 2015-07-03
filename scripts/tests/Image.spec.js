'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Image = require('../components/Image');

describe('Image', () => {
    const endHandler = () => {};
    const dragHandler = () => {};

    it('renders a draggable image', () => {
        const res = TestUtils.renderIntoDocument(<Image src='yay' endHandler={endHandler} dragHandler={dragHandler} />);
        expect(res).not.to.equal(undefined);
    });
});
