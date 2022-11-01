const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	mode: "development",
	devServer: {
		static: {
			directory: path.join(__dirname, "build"),
		},
		compress: true,
		hot: true,
		port: 9001,
		liveReload: true,
		open: true,
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
				type: "asset/resource",
			},
			{
				test: /\.(css|s[ac]ss)$/,
				use: [
					"style-loader", "css-loader", "sass-loader",
				]
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{ 
				test: /\.(handlebars|hbs)$/,
				loader: "handlebars-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "TRIPLE K",
			template: path.resolve(__dirname, "index.html")
		}),
	]
};