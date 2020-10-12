// Development webpack config, configures webpack-dev-server and friendly errors
'use strict';

const path = require('path');
const config = require('./config.js');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = merge(config, {
	mode: 'development',
	devtool: 'cheap-module-source-map',

	output: {
		publicPath: '/static/frontend/',
	},

	// webpack-dev-server settings
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		host: '0.0.0.0',
		port: 5000,
		hot: true,
		quiet: true,
		overlay: {
			errors: true,
			warnings: true,
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},

	plugins: [
		// Replace modules without stopping webpack-dev-server
		new webpack.HotModuleReplacementPlugin(),

		// Disable splitting into multiple javascript bundles because of django integration problems
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),

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
