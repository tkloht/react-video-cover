const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

const CONFIG_DEV = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: SRC_PATH,
    alias: {
      sinon: path.resolve(ROOT_PATH, 'node_modules/sinon/pkg/sinon.js'),
    },
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(SRC_PATH, 'main.js'),
  ],
  module: {
    noParse: [
      /\/sinon\.js/,
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [SRC_PATH],
        query: {
          presets: ['stage-0', 'es2015', 'react'],
          plugins: [
            'transform-class-properties',
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }],
            }],
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
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

module.exports = CONFIG_DEV;
