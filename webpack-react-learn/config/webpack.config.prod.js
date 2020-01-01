/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve('proddist')
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
					{
						loader: MiniCssExtractPlugin.loader,
					},
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
			filename: path.resolve('proddist/index.html')
		}),
		
		// CleanWebpackPlugin每次打包前会删除上次生成/dist文件
		new CleanWebpackPlugin(),

		// MiniCssExtractPlugin会将css文件单独分离出来，生产模式下css单独文件可以提升加载速度
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),

		// ManifestPlugin打包时追踪输入输出文件，生成manifest.json清单
		new ManifestPlugin(),
	]
};
