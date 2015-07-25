'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const ImageStack = require('../components/ImageStack');

describe('ImageStack', () => {
    const xSizeHandler = sinon.spy();
    const hSizeHandler = sinon.spy();
    const leftHandler = () => {};
    const rightHandler = () => {};

    it('renders an empty stack of Images', () => {
        const images = [];
        const res = TestUtils.renderIntoDocument(<ImageStack images={images}
            xSizeHandler={xSizeHandler} hSizeHandler={hSizeHandler}
            leftHandler={leftHandler} rightHandler={rightHandler} />);
        const stack = TestUtils.findRenderedDOMComponentWithClass(res, 'stack');
        expect(stack).not.to.equal(undefined);
    });

    it('renders a stack of Images', () => {
        const images = ['minion1.jpg'];
        const res = TestUtils.renderIntoDocument(<ImageStack images={images}
            xSizeHandler={xSizeHandler} hSizeHandler={hSizeHandler}
            leftHandler={leftHandler} rightHandler={rightHandler} />);
        const stackedImage = TestUtils.findRenderedDOMComponentWithClass(res, 'stacked');
        expect(stackedImage).not.to.equal(undefined);
    });

    describe('_handleDrag', () => {
        it('calls the sizehandlers based on positive or negative dragging', () => {
            const images = ['minion1.jpg'];
            const res = TestUtils.renderIntoDocument(<ImageStack images={images}
                xSizeHandler={xSizeHandler} hSizeHandler={hSizeHandler}
                leftHandler={leftHandler} rightHandler={rightHandler} />);
            res._handleDrag(null, {
                position: {
                    left: 10
                }
            });
            expect(hSizeHandler.calledOnce).to.equal(true);
            res._handleDrag(null, {
                position: {
                    left: -10
                }
            });
            expect(xSizeHandler.calledOnce).to.equal(true);
        });
    });

    describe('_handleDragEnd', () => {
        it('animates back if it wasnt dragged far enough', () => {
            const animateBackSpy = sinon.spy();
            const images = ['minion1.jpg'];
            const res = TestUtils.renderIntoDocument(<ImageStack images={images}
                xSizeHandler={xSizeHandler} hSizeHandler={hSizeHandler}
                leftHandler={leftHandler} rightHandler={rightHandler} />);
            res._handleDragEnd(animateBackSpy, null, null, {
                position: {
                    left: -10,
                    top: 10
                }
            });
            expect(animateBackSpy.calledOnce).to.equal(true);
        });

        it('animates out otherwise', () => {
            const animateOutSpy = sinon.spy();
            const images = ['minion1.jpg'];
            const res = TestUtils.renderIntoDocument(<ImageStack images={images}
                xSizeHandler={xSizeHandler} hSizeHandler={hSizeHandler}
                leftHandler={leftHandler} rightHandler={rightHandler} />);
            res._handleDragEnd(null, animateOutSpy, null, {
                position: {
                    left: -100,
                    top: 10
                }
            });
            res._handleDragEnd(null, animateOutSpy, null, {
                position: {
                    left: 100,
                    top: 10
                }
            });
            expect(animateOutSpy.calledTwice).to.equal(true);
        });
    });
});
