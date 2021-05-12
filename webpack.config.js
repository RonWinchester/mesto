const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/components/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name].[contenthash][ext]',
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name].[contenthash][ext]',
      }
    },
    ]
  },
}