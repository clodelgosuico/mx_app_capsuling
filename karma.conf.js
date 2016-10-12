var webpackConfig = require('./webpack.config'),
    _ = require('lodash');

webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  var options = {
    browsers: [ 'PhantomJS' ],
    singleRun: false,
    frameworks: [ 'jasmine-ajax', 'jasmine' ],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './src/mx_modules/mx_common/tests.webpack.js',
      './tests.webpack.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-jasmine-ajax'
    ],
    port: 9876,
    preprocessors: {
      './src/mx_modules/mx_common/tests.webpack.js': [ 'webpack', 'sourcemap' ],
      './tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  };

  if (process.env.KARMA_TEST_MODE === 'CI') {
    options = _.merge({}, options, {
      singleRun: true
    });
  }

  config.set(options);
};