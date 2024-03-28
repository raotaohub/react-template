const os = require('os')
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./base.config')
const TerserPlugin = require('terser-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const pkg = require('../package.json')
const env = (process.env.NODE_ENV || 'DEV').toLocaleUpperCase()
const threads = os.cpus().length

/**
 * @type { webpack.Compiler['options'] }
 */
const devConfig = ({
    mode: 'production',
    devtool: false,
    output: {
        clean: true,
        filename: 'static/[name].bundle.[contenthash:8].js',
        publicPath: `https://xxx.com${pkg.name}/${env}/${pkg.version}/`,
        path: path.resolve(__dirname, `../dist/${env}/${pkg.version}`),
        chunkFilename: 'static/[name].[contenthash:8].js'
    },

    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
        new MiniCssExtractPlugin({
            filename: 'static/[name].[contenthash:8].css', // 根据文件内容生产hash
            ignoreOrder: true
        }),
        new LodashModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({ parallel: threads }), // 压缩css
            new TerserPlugin({
                // minify: TerserPlugin.esbuildMinify,
                minify: TerserPlugin.swcMinify,
                parallel: threads,
                // cache: true,
                // sourceMap: false,
                extractComments: true,
                terserOptions: {
                    format: {
                        comments: /^\**!|@preserve|@license|@cc_on/i
                    },
                    compress: {
                        unused: false // 是否删除未引用的函数和变量
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 20,
            maxInitialRequests: 10,
            enforceSizeThreshold: 50000,
            // 分隔代码
            cacheGroups: {
                reactfest: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|redux-logger|react-redux)[\\/]/,
                    chunks: 'initial',
                    enforce: true,
                    priority: 50,
                    name: 'reactfest'
                },
                antd: {
                    test: /[\\/]node_modules[\\/](antd|@ant-design|moment|dayjs|rc-[\s\S]*)[\\/]/,
                    chunks: 'initial',
                    enforce: true,
                    priority: 40,
                    name: 'antd'
                },
                common: {
                    test: /[\\/]src[\\/]components[\\/]common[\\/]/,
                    minChunks: 4,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    minSize: 100,
                    name: 'common'
                },
                components: {
                    test: /[\\/]src[\\/]components[\\/]/,
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    minSize: 100,
                    name: 'components'
                },
                pages: {
                    test: /[\\/]src[\\/]pages[\\/]/,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 5,
                    minSize: 0,
                    name: 'pages'
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: -10,
                    name: 'vendor'
                }
            }
        }
    }
})

module.exports = merge(baseConfig(false), devConfig)