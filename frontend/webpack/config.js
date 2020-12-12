// General webpack config, both dev and dist modes build on it
'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	target: 'web',

	// Specify entry files
	entry: {
		main: './src/index.jsx',
	},

	// Specify output directory (./dist) and bundle name format
	output: {
		filename: 'js/[name].[hash].js',
		path: path.resolve(__dirname, '../dist'),
	},

	// Create global bindings for common paths
	resolve: {
		symlinks: false,
		cacheWithContext: false,
		alias: {
			Root: path.resolve(__dirname, '../src/'),
			Components: path.resolve(__dirname, '../src/components/'),
			Pages: path.resolve(__dirname, '../src/pages/'),
			Theme: path.resolve(__dirname, '../src/theme'),
			Utils: path.resolve(__dirname, '../src/utils'),
		},
	},

	plugins: [
		// Copy assets and manifest to dist directory
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../static/assets'),
					to: path.resolve(__dirname, '../dist/assets'),
					toType: 'dir',
				},
				{
					from: path.resolve(__dirname, '../static/manifest.json'),
					to: path.resolve(__dirname, '../dist/manifest.json'),
					toType: 'file',
				},
			],
		}),
	],
};
