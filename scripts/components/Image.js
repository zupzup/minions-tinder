'use strict';

const React = require('react/addons');

const Image = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render() {
        return (
            <div>
                image
            </div>
        );
    }
});

module.exports = Image;
