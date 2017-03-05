const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const sourcePath = path.join(__dirname, './src');

module.exports = {
    context: __dirname,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 15000,
                            name: 'images/[hash:8].[name].[ext]'
                        },
                    },
                ],
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            sourcePath,
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/vendor-manifest.json'),
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('./dll/vendor.dll.js'),
        }),
    ],
};
