const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPahtsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/* worker 插件 */
// const AlloyWorkerPlugin = require("alloy-worker/lib/plugin");

/**@type {import('webpack').Configuration}*/
const config = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  // experiments: {
  //   lazyCompilation: true,
  // },
  // externals: {
  //   react: "react",
  //   "react-dom": "ReactDOM",
  //   "react-router-dom": "reactRouterDOM",
  // },
  cache: {
    type: "filesystem",
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: "./dist",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) =>
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
        htmlWebpackPlugin.options.title +
        '</title></head><body><div id="app"></div></body></html>',
      filename: "index.html",
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    // new AlloyWorkerPlugin({}),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPahtsPlugin({
        // 配置文件引入 tsconfig.json
        configFile: path.join(__dirname, "./tsconfig.json"),
      }),
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        worker: {
          test: /src\/worker/,
          name: "worker",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = "[name].[hash].js";
  }

  return config;
};
