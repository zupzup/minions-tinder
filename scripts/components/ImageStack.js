'use strict';

const React = require('react/addons');
const Image = require('./Image');

const ImageStack = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        images: React.PropTypes.array.isRequired
    },

    render() {
        return (
            <div className='stack'>
                {this.props.images.map((img) => {
                    return <Image key={img} src={img}/>
                })}
            </div>
        );
    }
});

module.exports = ImageStack;
