const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./base.config')

/**
 * @type { webpack.Compiler['options'] }
 */
const devConfig = ({
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js',
        clean: true,
    },
    devServer: {
        port: 8080,
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        historyApiFallback: true,
        hot: true,
        // proxy: {}, // TODO 自行配置
    },
    cache: {
        type: 'filesystem',
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
})

module.exports = (env, argv) => {
    const config = merge(baseConfig(true), devConfig)
    if (argv.hot) {
        // Cannot use 'contenthash' when hot reloading is enabled.
        config.output.filename = '[name].[hash].js';
    }

    return config;
};