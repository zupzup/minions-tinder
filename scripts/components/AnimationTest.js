'use strict';

const React = require('react/addons');
const Spring = require('react-motion').Spring;

const AnimationTest = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    _startAnimation() {
        if (this.state.currentX > 0) {
            this.setState({
                currentX: 0
            });
        } else {
            this.setState({
                currentX: 200
            });
        }
    },

    getInitialState() {
        return {
            currentX: 0
        };
    },

    render() {
        return (
            <div>
                <div className='stack'>
                    <Spring endValue={{val: this.state.currentX}}>
                        {interpolated =>
                            <div className='stacked' style={{
                                transform: `translate3d(${interpolated.val}px, 0, 0)`
                            }}>
                                <img src={'images/stuart.jpg'} />
                            </div>
                        }
                    </Spring>
                </div>
                <button onClick={this._startAnimation}>start Animation</button>
            </div>
        );
    }
});

module.exports = AnimationTest;

