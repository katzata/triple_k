const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	devServer: {
		contentBase: path.resolve(__dirname, "./dist"),
		index: "index.html",
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|ttf|woff|woff2|pdf)$/,
				loader: "file-loader",
				options: {
					outputPath: "assets",
					name: '[name].[ext]'
				},
			},
			{
				test: /\.css$/,
				use: [
					"style-loader", "css-loader"
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/env"],
						plugins: [ "transform-class-properties" ]
					}
				}
			}
		]
	}
};