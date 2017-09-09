// we normally aren't allowed `import` being here because our tsconfig.json file targets ES6
// modules and `ts-node` doesn't support ES6 (hence the use of webpack). However, because the
// only place where `Webpack` is referenced is inside type declarations, the import statement is
// removed at transpilation-time so no error occurs.
import * as Webpack from 'webpack';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const entry: string[] = [
    'babel-polyfill',
    path.resolve('src/index.tsx'),
];

const plugins: Webpack.Plugin[] = [
    new CopyWebpackPlugin([{
        from: path.resolve('src/index.html'),
    }]),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin(),
];

if (process.env.NODE_ENV === 'development') {
    entry.unshift('react-hot-loader/patch');

    plugins.unshift(...[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]);
} else if (process.env.NODE_ENV === 'production') {
    plugins.unshift(...[
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
    ]);
}

const config: Webpack.Configuration = {
    entry,
    plugins,

    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve('dist'),
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /.tsx?$/,
            include: path.resolve('src'),
            exclude: /node_modules/,
            use: [
                'babel-loader',
                'awesome-typescript-loader',
            ],
        }, {
            test: /\.s?css$/,
            // exclude: /node_modules/,
            use: [{
                loader: 'style-loader',
                options: {
                    sourceMap: true,
                },
            }, {
                loader: 'css-loader',
                options: {
                    // modules: true,
                    importLoaders: 1,
                    localIdentName: 'dac_[name]__[local]',
                },
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                },
            }],
        }],
    },

    devServer: {
        port: 8080,
        historyApiFallback: true,
        hotOnly: true,
        contentBase: path.resolve('dist/'),
    },
};

module.exports = config;
