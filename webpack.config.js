const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

const resolveAlias = {
  client: path.resolve(__dirname, 'client/')
}

let entries = {
  rent_car: path.resolve(__dirname, 'client/rent_car.js'),
  index: path.resolve(__dirname, 'client/index.js'),
  active_rents: path.resolve(__dirname, 'client/active_rents.js')
}

let plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'client/rent_car.html'),
    filename: 'rent_car.html',
    inject: 'body',
    chunks: ['rent_car']
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'client/index.html'),
    filename: 'index.html',
    inject: 'body',
    chunks: ['index']
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'client/active_rents.html'),
    filename: 'active_rents.html',
    inject: 'body',
    chunks: ['active_rents']
  })    
]

module.exports = {
  mode: 'development',
  devServer: {
    hot: false,
    historyApiFallback: true,
    static: path.resolve(__dirname, "./dist")
  },
  entry: entries,
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: resolveAlias
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.(otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
}
