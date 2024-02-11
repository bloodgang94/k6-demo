const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const GlobEntries = require('webpack-glob-entries')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: GlobEntries('./src/test/*test*.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
      os: false,
      path: false,
      crypto: false,
      buffer: require.resolve('buffer'),
    },
    alias: {
      app: path.resolve(process.cwd(), './src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({ systemvars: true }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    // Copy assets to the destination folder
    // see `src/post-file-test.ts` for an test example using an asset
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  devtool: 'source-map',
}
