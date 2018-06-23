const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')
const combineLoaders = require('webpack-combine-loaders');

module.exports = {
	entry: {
		main: "./src/index.tsx"
	},
	output: {
		publicPath: "/public/",
		path: path.resolve(__dirname, "public"),
		filename: "[name]bundle.js"
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.css$/,	
				include: path.resolve(__dirname, "src"),
				use: [
					'style-loader',
					{
						loader: 'typings-for-css-modules-loader',
						options: {
							modules: true,
							namedExport: true
						}
					}
				]							
			},
			{
				test: /\.(ts|tsx)$/,
				include: path.resolve(__dirname, "src"),
				exclude: /node_modules/,
				loader: 'ts-loader'				
			},	
			{
				test:/.(png|jpg|gif)$/,
				loader: 'file-loader'
			}
		]
	},	
	devtool: "source-map",
	watchOptions: {
		ignored: /node_modules/
	}	
}