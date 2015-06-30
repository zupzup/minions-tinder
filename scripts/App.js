'use strict';

const React = require('react/addons');
const Image = require('./components/Image');

const App = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState() {
        return {
        };
    },

    render() {
        return (
            <div className='app row'>
                <div className='small-12 columns'>
                    yay
                    <Image />
                </div>
            </div>
        );
    }
});

module.exports = App;
