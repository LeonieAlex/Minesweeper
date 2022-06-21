const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
		return {
		mode: 'development',
		context: path.join(__dirname, 'app'),
		entry: {
			app: './js/app.ts',
			styles: './css/main.pcss'
		},
		output: {
			filename: '[name].js',
			path: path.join(__dirname, 'public'),
			chunkFilename: '[id].[chunkhash].js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'app/index.html'),
				inject: 'body'
			}),
			new MiniCssExtractPlugin()
		],
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
				   test: /\.p?(css)$/i,
				   oneOf: [
					   {
						   resourceQuery: /module/,
						   use: [
							   MiniCssExtractPlugin.loader,
							   {
								   loader: 'css-loader',
								   options: {
									   url: false,
									   sourceMap: env.production !== true,
									   importLoaders: 1,
									   modules: {
										   localIdentName: '[local]_[hash:base64:5]'
									   }
								   }
							   },
							   {
								   loader: 'postcss-loader',
								   options: {
									   sourceMap: env.production !== true
								   }
							   }
						   ]
					   },
					   {
						   use: [
							   MiniCssExtractPlugin.loader,
							   {
								   loader: 'css-loader',
								   options: {
									   url: false,
									   sourceMap: env.production !== true,
									   importLoaders: 1,
									   modules: false
								   }
							   },
							   {
								   loader: 'postcss-loader',
								   options: {
									   sourceMap: env.production !== true
								   }
							   }
						   ]
					   }
				   ]
			   }
			]
		}
	}
};
