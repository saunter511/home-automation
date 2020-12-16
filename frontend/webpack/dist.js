// Distribution webpack config, configures optimization and minimization
'use strict';

const path = require('path');
const config = require('./config.js');
const { merge } = require('webpack-merge');

const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = merge(config, {
	mode: 'production',

	// Configure where the output folder should be
	output: {
		publicPath: '/static/',
	},

	module: {
		rules: [
			// Compile .js and .jsx files with babel
			{
				test: /\.[jt]s(x)?$/,
				resolve: { extensions: ['.js', '.jsx', '.mjs'] },
				include: path.resolve(__dirname, '../src'),
				use: ['babel-loader'],
			},
		],
	},

	// Specify Terser configuration
	optimization: {
		minimize: true,
	},

	plugins: [
		// Inject workbox into serviceworker
		new InjectManifest({
			swSrc: path.join(__dirname, '../src/sw.js'),
			swDest: 'sw.js',
		}),
	],
});
