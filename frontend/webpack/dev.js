// Development webpack config, configures webpack-dev-server and friendly errors
'use strict';

const path = require('path');
const config = require('./config.js');
const { merge } = require('webpack-merge');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(config, {
	mode: 'development',
	devtool: 'cheap-module-source-map',

	output: {
		publicPath: 'http://localhost:5000/',
		crossOriginLoading: 'anonymous',
	},

	module: {
		rules: [
			// Compile .js and .jsx files with babel
			{
				test: /\.[jt]s(x)?$/,
				resolve: { extensions: ['.js', '.jsx', '.mjs'] },
				include: path.resolve(__dirname, '../src'),
				use: [
					'thread-loader',
					{
						loader: 'babel-loader',
						options: {
							plugins: ['react-refresh/babel'],
						},
					},
				],
			},
		],
	},

	// webpack-dev-server settings
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		host: '0.0.0.0',
		port: 5000,
		hot: true,
		hotOnly: true,
		quiet: true,
		overlay: {
			errors: true,
			warnings: true,
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
	},

	plugins: [
		new ReactRefreshWebpackPlugin(),

		// Friendly errors plugin shows much more human friendly errors in the console
		new FriendlyErrors({
			compilationSuccessInfo: {
				messages: ['Available at: http://localhost:5000'],
			},
		}),

		// Create a javascript bundle info needed by django
		new BundleTracker({ path: __dirname, filename: '../dist/webpack-stats.json' }),
	],
});
