const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPahtsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

/**@type {import('webpack').Configuration}*/
const config = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash:8].js',
    clean: true,
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    historyApiFallback: true,
    hot: true,
    proxy: {},
  },
  devtool: isDev ? 'eval-cheap-module-source-map' : false,
  mode: isDev ? 'development' : 'production',
  cache: {
    type: 'filesystem',
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDev,
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: [
            isDev && require.resolve('react-refresh/babel'),
            ['@babel/plugin-transform-runtime', { regenerator: true }],
          ],
        },
      },
      {
        test: /\.less|css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        // https://webpack.js.org/guides/asset-modules/
        test: /\.(jpe?g|png|svg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]', // output
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 100kb
          },
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]',
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: true,
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.IS_DEV': JSON.stringify(isDev),
    }),
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, './node_modules')],
    plugins: [
      new TsconfigPahtsPlugin({
        // 配置文件引入 tsconfig.json
        configFile: path.join(__dirname, './tsconfig.json'),
      }),
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        basic: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|lodash)[\\/]/,
          chunks: 'initial',
          enforce: true,
          name: 'basic',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        worker: {
          test: /src\/worker/,
          name: 'worker',
          chunks: 'all',
        },
        common: {
          chunks: 'all',
          minChunks: 2,
          enforce: true,
          name: 'common',
        },
      },
    },
    // minimize: true, // dev
    minimizer: [
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
}

module.exports = (env, argv) => {
  return config
}
