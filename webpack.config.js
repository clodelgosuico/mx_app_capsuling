var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var appName = 'app';
var host = '0.0.0.0';
var port = '8080';

var plugins = [new webpack.HotModuleReplacementPlugin()], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/js/index'
  ],
  devtool: 'source-map',
  output: {
    path: __dirname + '/src/client',
    filename: outputFile,
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['rewire']
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.svg$/,
        loader: 'raw'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      './src/client/css',
      './foundation/scss'
    ],
    outputStyle: 'expanded',
    outFile: './css/main.css',
    sourceMap: true
  },
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react': path.join(__dirname, './node_modules', 'react'),
      'mx_common': path.resolve(__dirname, './src/mx_modules/mx_common/src'),
      'rc-tooltip': path.resolve(__dirname, './node_modules/rc-tooltip')
    },
    fallback: path.join(__dirname, "./node_modules")
  },
  resolveLoader: {
    fallback: path.join(__dirname, "./node_modules")
  },
  plugins: plugins
};

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: './src/client',
    hot: true,
    debug: true,
    proxy: {
      '/api/users/*/capsuling/*': {
        target: 'http://localhost:8001',
        secure: false
      },
      '/api/*': {
        target: process.env.COMMON_SERVICES_API_HOST || 'http://localhost:9001',
        secure: false
      }
    },
    historyApiFallback: true
  }).listen(port, host, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  console.log('-------------------------');
  console.log('Local web server runs at http://' + host + ':' + port);
  console.log('-------------------------');
}

module.exports = config;
