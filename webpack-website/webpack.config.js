module.exports = {
	entry: './entry.js', //入口文件
	output: {
		filename: 'bundle.js' //出口
	},
	devtool: 'source-map', //直接生成srouce-map
/*	devServer: {
		port: 8088,
		inline: true
	},*/
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/ //排除那些目录
		}]
	}/*,
	babel:{
			"presets":['es2015']
	}*/
	/*,
	resolve: {
		"extensions": ['', '.js', '.css', '.json', '.jsx'] //可以省略后缀名
	}*/
};