const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
				type: "asset/resource",
			},
			{
				test: /\.(css|s[ac]ss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader", "sass-loader",
				],
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.hbs$/,
				use: [
					"handlebars-loader"
				]
			}
		]
	},
	resolve: {
		extensions: ["*", ".js"]
	},
	output: {
		filename: "bundle[contenthash].js",
		path: path.resolve(__dirname, "build"),
		clean: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "styles[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			title: "TRIPLE K",
			template: path.resolve(__dirname, "src", "index.html")
		}),
		new CopyPlugin({
			patterns: [{ from: "src/assets", to: "assets"}],
		})
	]
};