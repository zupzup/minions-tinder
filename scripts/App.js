'use strict';

const React = require('react/addons');
const ImageStack = require('./components/ImageStack');

const App = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState() {
        return {
            images: ['kevin.jpg', 'bob.jpg', 'stuart.jpg']
        };
    },

    _discardImage() {
        const images = this.state.images;
        console.log('discard');
        this.setState({
            images: images.slice(0, images.length - 1)
        });
    },

    _favImage() {
        const images = this.state.images;
        console.log('fav');
        this.setState({
            images: images.slice(0, images.length - 1)
        });
    },

    render() {
        return (
            <div className='app row'>
                <div className='small-12 columns'>
                    Drag it!
                </div>
                <div className='small-12 columns'>
                    <ImageStack images={this.state.images} />
                </div>
                <div className='small-6 columns'>
                    <i className='buttons ion-close' onClick={this._discardImage} />
                </div>
                <div className='small-6 columns'>
                    <i className='buttons ion-heart' onClick={this._favImage} />
                </div>
            </div>
        );
    }
});

module.exports = App;
