const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(css|s[ac]ss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', "sass-loader",
				],
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
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
		extensions: ['*', '.js']
	},
	output: {
		filename: 'bundle[contenthash].js',
		path: path.resolve(__dirname, 'build'),
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
			patterns: [{ from: 'src/assets', to: 'assets'}],
		}),
		// new HandlebarsPlugin({
		// 	// path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
		// 	entry: path.join(process.cwd(), "app", "src", "*.hbs"),
		// 	// output path and filename(s). This should lie within the webpacks output-folder
		// 	// if ommited, the input filepath stripped of its extension will be used
		// 	output: path.join(process.cwd(), "build", "[name].html"),
		// 	// you can also add a [path] variable, which will emit the files with their relative path, like
		// 	// output: path.join(process.cwd(), "build", [path], "[name].html"),

		// 	// data passed to main hbs template: `main-template(data)`
		// 	data: require("./app/data/project.json"),
		// 	// or add it as filepath to rebuild data on change using webpack-dev-server
		// 	data: path.join(__dirname, "app/data/project.json"),

		// 	// globbed path to partials, where folder/filename is unique
		// 	partials: [
		// 		path.join(process.cwd(), "app", "src", "components", "*", "*.hbs")
		// 	],

		// 	// register custom helpers. May be either a function or a glob-pattern
		// 	helpers: {
		// 		nameOfHbsHelper: Function.prototype,
		// 		projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
		// 	},

		// 	// hooks
		// 	// getTargetFilepath: function (filepath, outputTemplate) {},
		// 	// getPartialId: function (filePath) {}
		// 	onBeforeSetup: function (Handlebars) { },
		// 	onBeforeAddPartials: function (Handlebars, partialsMap) { },
		// 	onBeforeCompile: function (Handlebars, templateContent) { },
		// 	onBeforeRender: function (Handlebars, data, filename) { },
		// 	onBeforeSave: function (Handlebars, resultHtml, filename) { },
		// 	onDone: function (Handlebars, filename) { }
		// })
	]
};