const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const miniCSSExtractPluginLoader = {
	loader: MiniCssExtractPlugin.loader,
	options: {
		publicPath: '../'
	}
}

const postCSSLoader = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [
				[
					'autoprefixer'
				]
			]
		}
	}
}

module.exports = merge(common, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					miniCSSExtractPluginLoader,
					'css-loader',
					postCSSLoader,
					'sass-loader'
				]
			}
		]
	},
	mode: 'production',
	devtool: false,
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			})
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[id].[hash].css'
		}),
		new CleanWebpackPlugin()
	]
})
