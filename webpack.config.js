var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: [
    './examples/app.jsx'
  ],
  devServer: {
    contentBase: './examples/',
    hot: true
  },
	output: {
    path: path.join(__dirname, 'examples'),
		filename: 'bundle.js',
	},
	resolveLoader: {
		modulesDirectories: ['node_modules']
	},
	resolve: {
		extensions: ['', '.js', '.cjsx', '.coffee']
	},
  plugins: [
  ],
	module: {
		loaders: [
      { test: /\.css$/, loaders: ['style', 'css']},
      { test: /\.cjsx$/, loaders: ['coffee', 'cjsx']},
      { test: /\.jsx$/, loader: 'babel'},
      { test: /\.coffee$/, loader: 'coffee' }
    ]
  }
};
