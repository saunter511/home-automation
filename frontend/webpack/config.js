// General webpack config, both dev and dist modes build on it
'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
	target: 'web',
	devtool: 'cheap-module-source-map',

	// Specify entry files
	entry: {
		main: './src/index.jsx',
	},

	// Specify output directory (./dist) and bundle name format
	output: {
		filename: 'js/[name].[contenthash:8].js',
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
		// Clean plugin removed output directory before building to avoid conflicts
		new CleanWebpackPlugin(),

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

		// Save a manifest with bundle information
		new WebpackManifestPlugin({
			fileName: 'webpack-manifest.json',
		}),
	],
};
