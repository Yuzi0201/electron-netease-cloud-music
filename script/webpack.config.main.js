'use strict';

const webpack = require('webpack');

const { isProd, absPath } = require('./util');
const packageJson = require('../package.json');

let cfg = {
    performance: { hints: false },
    context: absPath('src/main'),
    target: 'electron-main',
    entry: {
        main: './index.js'
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: absPath('dist')
    },
    node: {
        __dirname: false,
        __filename: false
    }
};

if (isProd) {
    // release config
    cfg.mode = 'production';
    cfg.devtool = 'source-map';
    cfg.plugins = [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
    ];
} else {
    // dev config
    cfg.mode = 'development';
    cfg.devtool = 'cheap-module-eval-source-map';
    cfg.externals = Object.keys(packageJson.dependencies);
    cfg.resolve = {
        modules: [
            absPath('node_modules')
        ]
    };
}

module.exports = cfg;
