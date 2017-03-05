const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./webpack.config.base');

module.exports = merge.smart(config, {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        './src/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
        // TODO，react-router 按需加载用
        chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /^((?!\.module).)*\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
});
