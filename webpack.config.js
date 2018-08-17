const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
// const buildConfigs = require('./buildEnv');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const ASSET_PATH = process.env.ASSET_PATH || '/';
const VERSION = `v${pkg.version}`;
const IS_PROD = ENV === 'production';

const SOURCE_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'build');
// const CLIENT_DIR = path.join(OUTPUT_DIR, VERSION);
// 可以配置你的 CDN 地址
const pubilcPath = ENV === 'development' ? '/' : ENV === 'production' ? `` : ``;

module.exports =  {
        mode: ENV, // 构建模式
        target: 'web',
        context: SOURCE_DIR,
        entry:  {
            app: './index.js',
        },
        output: {
            path: OUTPUT_DIR,
            filename: 'assets/[name].[hash:8].js',
            libraryTarget: 'umd',
            publicPath: pubilcPath,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.less$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                // modifyVars: antThemeVars,
                                javascriptEnabled: true
                            }
                        }
                    ] 
                }, {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                }, {
                    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
                    use: IS_PROD ? {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'assets/images/',
                        },
                    } : {
                        loader: 'url-loader',
                    },
                }],
        },
        plugins: [
            new webpack.DefinePlugin({
                // 'process.env.BUILD_CONFIG': JSON.stringify(config),
                'process.env.NODE_ENV': JSON.stringify(ENV),
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/css/style.[hash:8].css',
                chunkFilename: 'assets/css/[id].[hash:8].css',
            }),
            // Server-only plugins
        ].concat([
            new ManifestPlugin(),
            new CopyWebpackPlugin([
                // { from: 'favicon.ico' },
            ]),
            new HtmlWebpackPlugin({
                title: '',
                filename: './index.html',
                template: './index.ejs',
            }),
        ]),
        devtool: IS_PROD ? 'source-map' : 'eval-source-map',
        devServer: {
            port: process.env.PORT || 3000,
            host: '127.0.0.1',
            publicPath: '/',
            contentBase: SOURCE_DIR,
            historyApiFallback: true,
            proxy: {
                
            }
  
        },
    };
