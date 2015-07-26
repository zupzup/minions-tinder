var path = require('path');
module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            'test_index.js'
        ],
        frameworks: ['mocha', 'chai', 'sinon'],
        preprocessors: {
            'test_index.js': ['webpack']
        },
        reporters: ['dots', 'coverage'],
        singleRun: true,
        webpack: {
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        include: path.resolve('scripts/tests/'),
                        exclude: /node_modules/,
                        loader: 'babel'
                    },
                    {
                        test: /\.js$/,
                        include: path.resolve('scripts/'),
                        loader: 'isparta'
                    }
                ]
            },
            watch: true
        },
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};
