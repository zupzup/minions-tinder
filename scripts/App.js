'use strict';

const React = require('react/addons');
const ImageStack = require('./components/ImageStack');
const ICON_SIZE = 4;

const App = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState() {
        return {
            images: ['kevin.jpg', 'bob.jpg', 'stuart.jpg'],
            xSize: ICON_SIZE,
            hSize: ICON_SIZE
        };
    },

    componentWillMount() {
        const images = ['kevin.jpg', 'bob.jpg', 'stuart.jpg'];
        images.forEach((img) => {
            const image = new Image();
            image.src = 'images/' + img;
        });
    },

    _discardImage() {
        const images = this.state.images;
        this.setState({
            images: images.slice(0, images.length - 1),
            xSize: ICON_SIZE,
            hSize: ICON_SIZE
        });
    },

    _favImage() {
        const images = this.state.images;
        this.setState({
            images: images.slice(0, images.length - 1),
            xSize: ICON_SIZE,
            hSize: ICON_SIZE
        });
    },

    _setXSize(val) {
        this.setState({
            xSize: val
        });
    },

    _setHSize(val) {
        this.setState({
            hSize: val
        });
    },

    render() {
        return (
            <div className='app row'>
                <div className='small-12 columns text-center'>
                    Drag it!
                </div>
                <div className='small-12 columns'>
                    <ImageStack
                        leftHandler={this._discardImage}
                        rightHandler={this._favImage}
                        xSizeHandler={this._setXSize}
                        hSizeHandler={this._setHSize}
                        images={this.state.images} />
                </div>
                <div className='small-6 columns text-center iconcontainer'>
                    <i style={{fontSize: this.state.xSize + 'rem', marginTop: (ICON_SIZE - this.state.xSize) + 'rem'}}
                        className='buttons ion-close' onClick={this._discardImage} />
                </div>
                <div className='small-6 columns text-center iconcontainer'>
                    <i style={{fontSize: this.state.hSize + 'rem', marginTop: (ICON_SIZE - this.state.hSize) + 'rem'}}
                        className='buttons ion-heart' onClick={this._favImage} />
                </div>
            </div>
        );
    }
});

module.exports = App;

