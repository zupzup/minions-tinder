'use strict';

const React = require('react/addons');
const Draggable = require('../external/draggable').draggable;
const createCSSTransform = require('../external/draggable').createCSSTransform;
const tweenState = require('react-tween-state');
const classNames = require('classnames');
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
            beginValue: endX,
            endValue: 0
        });
        this.tweenState('top', {
            duration: ANIMATION_LENGTH,
            beginValue: endY,
            endValue: 0,
            onEnd: this._resetDraggable
        });
    },

    _animateOut(endX, endY, endHandler) {
        this.tweenState('left', {
            duration: ANIMATION_LENGTH,
            beginValue: endX,
            endValue: endX * 10
        });
        this.tweenState('top', {
            duration: ANIMATION_LENGTH,
            beginValue: endY,
            endValue: endY * 10,
            onEnd: endHandler
        });
    },

    _resetDraggable() {
        this.refs.draggable.resetState();
    },

    render() {
        const endHandler = this.props.endHandler.bind(null, this._animateBack, this._animateOut);
        const tweeningY = this.getTweeningValue('top');
        const tweeningX = this.getTweeningValue('left');
        let calculatedStyle = {};

        if (tweeningX !== 0 || tweeningY !== 0) {
            calculatedStyle = createCSSTransform({x: tweeningX, y: tweeningY});
        }
        return (
            <Draggable ref='draggable' handle='.handle'
                onDrag={this.props.dragHandler}
                cancel='.animating' onStop={endHandler}>
                <div className='stacked' style={calculatedStyle}>
                    <img draggable="false"
                        className={classNames('handle', {'animating': tweeningX > 0})}
                        src={'images/' + this.props.src} />
                </div>
            </Draggable>
        );
    }
});

module.exports = Image;

