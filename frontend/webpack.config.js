const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';

  return {
    output: {
      path: path.join(__dirname, devMode ? 'dist' : 'bundle'),
      filename: 'bundle.js'
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
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        // {
        //   test: /\.(jpe?g|png|gif|svg|ico)$/i,
        //   loaders: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         hash: 'sha512',
        //         name: '[hash].[ext]',
        //         outputPath: '../assets/compiled'
        //       }
        //     },
        //     {
        //       loader: 'image-webpack-loader',
        //       query: {
        //         mozjpeg: {
        //           progressive: true,
        //         },
        //         gifsicle: {
        //           interlaced: false,
        //         },
        //         optipng: {
        //           optimizationLevel: 4,
        //         },
        //         pngquant: {
        //           quality: '75-90',
        //           speed: 3,
        //         }
        //       }
        //     }
        //   ]
        // }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:8000',
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.css',
        chunkFilename: '[id].css',
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
