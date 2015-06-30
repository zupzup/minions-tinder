'use strict';

const React = require('react/addons');

const Image = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render() {
        return (
            <img className='stacked' src={'images/' + this.props.src} />
        );
    }
});

module.exports = Image;
