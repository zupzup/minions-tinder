// way simplified version of https://github.com/mzabriskie/react-draggable
'use strict';
const React = require('react/addons');
const assign = require('object-assign');

function createUIEvent(draggable) {
    return {
        node: React.findDOMNode(draggable),
        position: {
            top: draggable.state.clientY,
            left: draggable.state.clientX
        }
    };
}

const eventsFor = {
    touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    },
    mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    }
};

let dragEventFor = eventsFor.mouse;

function getControlPosition(e) {
    const position = (e.touches && e.touches[0]) || e;
    return {
        clientX: position.clientX,
        clientY: position.clientY
    };
}

function createCSSTransform(style) {
    const x = style.x + 'px';
    const y = style.y + 'px';
    return {
        transform: 'translate(' + x + ',' + y + ')',
        WebkitTransform: 'translate(' + x + ',' + y + ')',
        OTransform: 'translate(' + x + ',' + y + ')',
        msTransform: 'translate(' + x + ',' + y + ')',
        MozTransform: 'translate(' + x + ',' + y + ')'
    };
}

module.exports = {
    createCSSTransform: createCSSTransform,
    draggable: React.createClass({

        propTypes: {
            handle: React.PropTypes.string,
            cancel: React.PropTypes.string,
            onDrag: React.PropTypes.func,
            onStop: React.PropTypes.func
        },

        componentWillUnmount() {
            document.removeEventListener(dragEventFor.move, this.handleDrag, true);
            document.removeEventListener(dragEventFor.end, this.handleDragEnd, true);
        },

        getInitialState() {
            return {
                dragging: false,
                offsetX: 0, offsetY: 0, clientX: 0, clientY: 0
            };
        },

        handleDragStart(e) {
            if (!(this.props.handle && e.target.matches(this.props.handle)) ||
                (this.props.cancel && e.target.matches(this.props.cancel))) {
                return;
            }
            const dragPoint = getControlPosition(e);

            this.setState(() => {
                return {
                    dragging: true,
                    offsetX: dragPoint.clientX - this.state.clientX,
                    offsetY: dragPoint.clientY - this.state.clientY
                };
            });

            document.addEventListener(dragEventFor.move, this.handleDrag, true);
            document.addEventListener(dragEventFor.end, this.handleDragEnd, true);
        },

        handleDragEnd(e) {
            if (!this.state.dragging) {
                return;
            }

            this.setState(() => {
                return {
                    dragging: false
                };
            });

            this.props.onStop(e, createUIEvent(this));

            document.removeEventListener(dragEventFor.move, this.handleDrag, true);
            document.removeEventListener(dragEventFor.end, this.handleDragEnd, true);
        },

        handleDrag(e) {
            e.preventDefault();
            const dragPoint = getControlPosition(e);
            const clientX = dragPoint.clientX - this.state.offsetX;
            const clientY = dragPoint.clientY - this.state.offsetY;

            this.props.onDrag(e, createUIEvent(this));
            this.setState(() => {
                return {
                    clientX: clientX,
                    clientY: clientY
                };
            });
        },

        onMouseDown(ev) {
            // Prevent 'ghost click' which happens 300ms after touchstart if the event isn't cancelled.
            if (dragEventFor == eventsFor.touch) {
                return ev.preventDefault();
            }
            return this.handleDragStart.apply(this, arguments);
        },

        onTouchStart() {
            dragEventFor = eventsFor.touch;
            return this.handleDragStart.apply(this, arguments);
        },

        resetState() {
            this.setState(() => {
                return this.getInitialState();
            });
        },

        render() {
            const childStyle = this.props.children.props.style || {};
            const transform = createCSSTransform({
                x: this.state.clientX,
                y: this.state.clientY
            });
            const style = assign({}, transform, childStyle);

            return React.cloneElement(React.Children.only(this.props.children), {
                onMouseDown: this.onMouseDown,
                onTouchStart: this.onTouchStart,
                onMouseUp: this.handleDragEnd,
                onTouchEnd: this.handleDragEnd,
                style
            });
        }
    })
};
