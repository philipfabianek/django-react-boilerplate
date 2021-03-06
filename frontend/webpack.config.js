const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';

  return {
    output: {
      path: devMode ? path.join(__dirname, 'dist') : path.join(__dirname, '..', 'static', 'build'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          enforce: 'pre',
          loader: 'eslint-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:8000',
        '/static': 'http://localhost:8000',
        '/initial-state': 'http://localhost:8000',
        '/activate': 'http://localhost:8000',
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.css',
        chunkFilename: 'chunk.css',
      }),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ]
    },
  };
}
