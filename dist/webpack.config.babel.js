"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mode = process.env.NODE_ENV || 'development';
var _default = {
  mode,
  devtool: 'source-map',
  // чтобы было видно файлы в консоли разраба
  // entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: _path.default.join(__dirname, 'dist', 'public') // publicPath: '/assets/',

  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true
        }
      }
    }, {
      test: /\.css$/,
      // loaders go in reverse order
      use: [{
        loader: _miniCssExtractPlugin.default.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }]
    }]
  },
  plugins: [new _miniCssExtractPlugin.default()]
};
exports.default = _default;