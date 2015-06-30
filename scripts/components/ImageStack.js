'use strict';

const React = require('react/addons');
const Image = require('./Image');
const THRESHOLD = 50;
const ICON_SIZE = 4;

const ImageStack = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        images: React.PropTypes.array.isRequired,
        xSizeHandler: React.PropTypes.func.isRequired,
        hSizeHandler: React.PropTypes.func.isRequired,
        leftHandler: React.PropTypes.func.isRequired,
        rightHandler: React.PropTypes.func.isRequired
    },

    _handleDrag(event, ui) {
        const factor = Math.abs(ui.position.left / THRESHOLD);
        if (ui.position.left > 0) {
            this.props.hSizeHandler(ICON_SIZE + (factor > 1 ? 1 : factor));
        } else {
            this.props.xSizeHandler(ICON_SIZE + (factor > 1 ? 1 : factor));
        }
    },

    _handleDragEnd(endHandler, e, ui) {
        if (ui.position.left > THRESHOLD) {
            this.props.rightHandler();
        } else if (ui.position.left < (- THRESHOLD)) {
            this.props.leftHandler();
        } else {
            endHandler(ui.position.left, ui.position.top);
        }
    },

    render() {
        return (
            <div className='stack'>
                {this.props.images.map((img) => {
                    return <Image
                        endHandler={this._handleDragEnd}
                        dragHandler={this._handleDrag}
                        key={img} src={img}/>
                })}
            </div>
        );
    }
});

module.exports = ImageStack;

