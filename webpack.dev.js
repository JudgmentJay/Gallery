const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const cssModuleLoader = {
	loader: 'css-loader',
	options: {
		modules: {
			localIdentName: '[local]__[hash:base64:5]',
		}
	}
}

module.exports = merge(common, {
	module: {
		rules: [
			{
				test: /\.s?css$/,
				exclude: /\.module\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.module\.scss$/,
				use: [
					'style-loader',
					cssModuleLoader,
					'sass-loader'
				],
				include: /src/
			}
		]
	},
	mode: 'development',
	devtool: false
})
