const path = require("node:path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const TsconfigPahtsPlugin = require("tsconfig-paths-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const smp = new SpeedMeasurePlugin();

/**
 * @type { webpack.Compiler['options'] }
 */
module.exports = (isDev) =>
	smp.wrap({
		entry: [path.resolve(__dirname, "../src/index.tsx")],
		devtool: false,
		module: {
			parser: {
				javascript: {
					importExportsPresence: false, // 屏蔽 commonjs exports 不合规语法 warning
				},
			},
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)?$/,
					exclude: /node_modules/,
					loader: "babel-loader",
					options: {
						cacheDirectory: isDev,
						presets: [
							"@babel/preset-env",
							[
								"@babel/preset-react",
								{
									runtime: "automatic", // 加上这行配置
								},
							],
							"@babel/preset-typescript",
						],
						plugins: [
							isDev ? require.resolve("react-refresh/babel") : {},
							["@babel/plugin-transform-runtime", { regenerator: true }],
						],
					},
				},
				{
					test: /\.less|css$/,
					use: [
						isDev ? "style-loader" : MiniCssExtractPlugin.loader,
						"css-loader",
						"postcss-loader",
						"less-loader",
					],
				},
				{
					// https://webpack.js.org/guides/asset-modules/
					test: /\.(jpe?g|png|svg|gif)$/i,
					type: "asset/resource",
					generator: {
						filename: "img/[name][ext][query]", // output
					},
					parser: {
						dataUrlCondition: {
							maxSize: 100 * 1024, // 100kb
						},
					},
				},
				{
					test: /\.(ttf|eot|woff|woff2)$/i,
					type: "asset/resource",
					generator: {
						filename: "font/[name].[hash:6][ext]",
					},
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js", "jsx"],
			modules: [path.resolve(__dirname, "../node_modules")],
			alias: {
				"@src": path.resolve(__dirname, "../src"),
				"@pages": path.resolve(__dirname, "../src/pages"),
			},
			plugins: [
				new TsconfigPahtsPlugin({
					// 配置文件引入 tsconfig.json
					configFile: path.join(__dirname, "../tsconfig.json"),
				}),
			],
		},
		plugins: [
			isDev && new ReactRefreshPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "../public/index.html"),
				inject: true,
				hash: true,
			}),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
				"process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV),
			}),
			// new webpack.DllReferencePlugin({
			//     context: __dirname,
			//     manifest: require('../build/bundle-manifest.json')
			// }),
			// new AddAssetHtmlPlugin({
			//     filepath: require.resolve('../build/bundle.dll.js'),
			//     publicPath: ''
			// }),
		].filter(Boolean),
	});
