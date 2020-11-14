const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Handlebars = require("handlebars");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'production',
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
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, "css-loader"
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
			},
			{
				test: /\.hbs$/,
				use: [
					"handlebars-loader"
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "styles[contenthash].css"
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "TRIPLE K",
			template: "src/index.hbs"
		}),
		new CopyPlugin([
			{ 
				from: 'src/assets', to: 'assets',
				ignore: [
					"fonts/font",
					'*.zip'
				]
			}
		])
	]
};