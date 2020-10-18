const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: ["./App.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Creatly',
        template: './src/template.html',
        filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [{ from: './src/pages/', to: 'pages/' }],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: {
          loader: "file-loader",
          options:{
            publicPath: 'webfonts',
            name:'[name].[ext]',
            outputPath : 'webfonts'
          }
        },
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
  },
};

module.exports = config;
