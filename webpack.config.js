const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  entry: {
    app: path.resolve(__dirname, 'src')
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
          minimize: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      ignoreOrder: false
    })
    // new CopyPlugin({
    //   patterns: [{ from: 'src/assets', to: 'assets/' }]
    // })
  ]
}
