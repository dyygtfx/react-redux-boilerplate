const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.config.base');

module.exports = merge.smart(config, {
    devtool: 'cheap-module-source-map',
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle-[chunkhash].js',
        // publicPath: 'http://xxx.cdn.com/', //需要上传到 cdn 的可以使用
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                screw_ie8: true, // 不支持ie8
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new ExtractTextPlugin({ filename: 'style-[contenthash].css', allChunks: true })
    ],
    module: {
        rules: [
            {
                test: /^((?!\.module).)*\.css$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', loader: 'css-loader' })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    loader: ['css-loader', 'less-loader', 'postcss-loader'],
                    fallbackLoader: 'style-loader'
                })
            },
            {
                test: /\.module\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64' +
                            ':5]!postcss-loader', 'postcss-loader'] // eslint-disable-line max-len
                })
            }
        ]
    }
});
