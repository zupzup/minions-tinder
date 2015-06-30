'use strict';

const React = require('react/addons');
const Draggable = require('react-draggable');
const tweenState = require('react-tween-state');
const ANIMATION_LENGTH = 150;

const Image = React.createClass({
    mixins: [React.addons.PureRenderMixin, tweenState.Mixin],

    getInitialState() {
        return {
            left: 0,
            top: 0
        };
    },

    propTypes: {
        src: React.PropTypes.string.isRequired,
        endHandler: React.PropTypes.func.isRequired,
        dragHandler: React.PropTypes.func.isRequired
    },

    _animateBack(endX, endY) {
        this.tweenState('left', {
            duration: ANIMATION_LENGTH,
            endValue: -endX
        });
        this.tweenState('top', {
            duration: ANIMATION_LENGTH,
            endValue: -endY,
            onEnd: this._resetDraggable
        });
    },

    _resetDraggable() {
        this.refs.draggable.resetState();
        this.setState({
            left: 0,
            top: 0
        });
    },

    render() {
        const endHandler = this.props.endHandler.bind(null, this._animateBack);
        const tweeningY = this.getTweeningValue('top');
        const tweeningX = this.getTweeningValue('left');
        const animating = tweeningX > 0 ? ' animating' : '';

        const calculatedStyle = {
            left: tweeningX,
            top: tweeningY
        };
        return (
            <Draggable ref='draggable' axis='both' handle='.handle'
                start={{x: tweeningX, y: tweeningY}} zIndex={100}
                onDrag={this.props.dragHandler}
                cancel='.animating'
                onStop={endHandler}>
                <div className='stacked' style={calculatedStyle}>
                    <img draggable="false" className={'handle' + animating} src={'images/' + this.props.src} />
                </div>
            </Draggable>
        );
    }
});

module.exports = Image;

