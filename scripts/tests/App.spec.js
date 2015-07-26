'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const App = require('../App');

describe('App', () => {
    it('renders the app with a stack of images', () => {
        const res = TestUtils.renderIntoDocument(<App />);
        const app = TestUtils.findRenderedDOMComponentWithClass(res, 'app');
        expect(app).not.to.equal(undefined);
    });

    describe('_discardImage', () => {
        it('removes an image from the stack', () => {
            const res = TestUtils.renderIntoDocument(<App />);
            res._discardImage();
            expect(res.state.images.length).to.equal(11);
        });
    });

    describe('_favImage', () => {
        it('removes an image from the stack', () => {
            const res = TestUtils.renderIntoDocument(<App />);
            res._favImage();
            expect(res.state.images.length).to.equal(11);
        });
    });

    describe('_setXSize', () => {
        it('sets the size of the x', () => {
            const res = TestUtils.renderIntoDocument(<App />);
            res._setXSize(5);
            expect(res.state.xSize).to.equal(5);
        });
    });
    describe('_setHSize', () => {
        it('sets the size of the heart', () => {
            const res = TestUtils.renderIntoDocument(<App />);
            res._setHSize(5);
            expect(res.state.hSize).to.equal(5);
        });
    });
});
