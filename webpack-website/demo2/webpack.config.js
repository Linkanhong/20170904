var path = require('path');
var webpack = require('webpack');

module.exports ={
	entry:"./src/index",
	output:{
		path: path.join(__dirname, './dist'),
		filename: 'js/build.js'
	},
	module:{
		loaders:[{
			test:/\.js|jsx$/,
			loader:"babel-loader"
		},{
			test: /\.css$/,
			loader:"style-loader!css-loader"
		},{
			test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader:"url-loader?limit=8192&name=../dist/build/img/[name].[hash:8].[ext]"
		}]
	}
}