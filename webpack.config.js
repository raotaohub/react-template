const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPahtsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
          plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
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
        test: new RegExp('\\.(gif|jpg|png|woff|svg|eot|ttf)\\??.*$'),
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: true,
      hash: true,
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
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js'
  }

  return config
}
