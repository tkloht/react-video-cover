const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const EXAMPLES_PATH = path.resolve(ROOT_PATH, 'examples');
const LIB_PATH = path.resolve(ROOT_PATH, 'lib');

const PUBLIC_PATH = '/';

const CONFIG_EXAMPLE_DIST = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      sinon: path.resolve(ROOT_PATH, 'node_modules/sinon/pkg/sinon.js'),
    },
  },
  entry: [
    path.join(EXAMPLES_PATH, 'main.js'),
  ],
  module: {
    noParse: [
      /\/sinon\.js/,
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [EXAMPLES_PATH, LIB_PATH],
        query: {
          presets: ['stage-0', 'es2015', 'react'],
          plugins: [
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist_examples'),
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      CONFIG: {
        basePath: JSON.stringify(PUBLIC_PATH),
      },
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: `${EXAMPLES_PATH}/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

module.exports = CONFIG_EXAMPLE_DIST;
