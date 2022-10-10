const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'src'),
		},
		compress: true,
		hot: true,
		port: 9000,
		liveReload: true
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
				type: 'asset/resource',
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
				use: ['babel-loader']
			},
			{ 
				test: /\.(handlebars|hbs)$/, loader: "handlebars-loader"
			}
		]
	}
};