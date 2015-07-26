'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Image = require('../components/Image');

describe('Image', () => {
    const endHandler = () => {};
    const dragHandler = () => {};

    it('renders a draggable image', () => {
        const res = TestUtils.renderIntoDocument(<Image src='yay'
            hidden={false} endHandler={endHandler} dragHandler={dragHandler} />);
        expect(res).not.to.equal(undefined);
    });

    describe('_animateBack', () => {
        it('calls tweenState twice, triggering an animation back', () => {
            const res = TestUtils.renderIntoDocument(
                <Image src='yay' endHandler={endHandler} hidden={false} dragHandler={dragHandler} />
            );
            res.tweenState = sinon.spy();
            res._animateBack(5, 10);
            expect(res.tweenState.calledTwice).to.equal(true);
        });
    });

    describe('_animateOut', () => {
        it('triggers tweenState twice, triggering an animation out', () => {
            const res = TestUtils.renderIntoDocument(
                <Image src='yay' endHandler={endHandler} hidden={false} dragHandler={dragHandler} />
            );
            res.tweenState = sinon.spy();
            res._animateOut(5, 10);
            expect(res.tweenState.calledTwice).to.equal(true);
        });
    });

    describe('_resetDraggable', () => {
        it('resets the draggable element to its initial state', () => {
            const res = TestUtils.renderIntoDocument(
                <Image src='yay' endHandler={endHandler} hidden={false} dragHandler={dragHandler} />
            );
            res.refs.draggable.resetState = sinon.spy();
            res._resetDraggable();
            expect(res.refs.draggable.resetState.calledOnce).to.equal(true);
        });
    });
});
