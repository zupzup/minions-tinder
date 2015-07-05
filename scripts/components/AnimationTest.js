'use strict';

const React = require('react/addons');

const AnimationTest = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState() {
        return {
        };
    },

    render() {
        return (
            <div className='stack'>
                <div className='stacked'>
                    <img src={'images/stuart.jpg'} />
                </div>
            </div>
        );
    }
});

module.exports = AnimationTest;

