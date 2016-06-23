const webpackConfig = require('./webpack.config');
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

module.exports = function configure(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    reporters: ['mocha'],
    files: [
      'tests/**/*.spec.js',
    ],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
    },

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
