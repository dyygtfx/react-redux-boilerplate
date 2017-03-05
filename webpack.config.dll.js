const path = require('path');
const webpack = require('webpack');

const pluginArr = () => {
    if (process.env.NODE_ENV == 'production') {
        return [new webpack.DllPlugin({
            path: path.join(__dirname, 'dll', '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    screw_ie8: true,
                    warnings: false,
                },
            })
        ];
    } else {
        return [new webpack.DllPlugin({
            path: path.join(__dirname, 'dll', '[name]-manifest.json'),
            name: '[name]_[hash]',
        })];
    }
};

module.exports = {
    context: __dirname,
    entry: {
        // 考虑通过从 package.json 里面直接读取 dependencies 内容
        vendor: ['react', 'react-dom', 'redux', 'react-router'],
    },
    devtool: '#source-map',
    output: {
        path: path.join(__dirname, 'dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    plugins: pluginArr(),
};
