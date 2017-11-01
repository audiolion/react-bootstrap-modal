const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  entry: {
    'rbm-complete': './src/less/rbm-complete.less',
    'rbm-patch': './src/less/rbm-patch.less',
  },
  output: {
    path: path.join(__dirname, 'lib', 'styles'),
    filename: '[name].css',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              loader: 'less-loader',
            },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [extractLess],
};
