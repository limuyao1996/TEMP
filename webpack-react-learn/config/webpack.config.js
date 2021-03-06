/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve('dist')
	},
	devServer: {
		hot: true
	},
	module: {
		rules: [
			{
				exclude: [ /\.html$/, /\.md$/, /\.(js|jsx)$/, /\.css$/, /\.less$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'file-loader',
				options: {
					name: 'static/media/[name].[ext]'
				}
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/images/[name].[hash:8].[ext]'
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(less|css)$/,
				use: [
					'style-loader',
					// {
					// 	loader: MiniCssExtractPlugin.loader,
					// },
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			}
		],
	},
	plugins: [
		// HtmlWebpackPlugin自动将打包生成的js文件添加进html
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: path.resolve('dist/index.html')
		}),
		
		// CleanWebpackPlugin每次打包前会删除上次生成/dist文件
		new CleanWebpackPlugin(),

		// 开启webpack全局热更新
		new webpack.HotModuleReplacementPlugin(),

		// 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
		new webpack.NamedModulesPlugin(),

		// MiniCssExtractPlugin会将css文件单独分离出来，生产模式下css单独文件可以提升加载速度
		// new MiniCssExtractPlugin({
		// 	// Options similar to the same options in webpackOptions.output
		// 	// both options are optional
		// 	filename: '[name].css',
		// 	chunkFilename: '[id].css'
		// }),

		// ManifestPlugin打包时追踪输入输出文件，生成manifest.json清单
		new ManifestPlugin(),
	]
};
