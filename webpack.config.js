var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const theme = require('./package.json').theme;

const extractLeSS = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks:true,
});
//生产环增压缩js;
let UglifyArray = []
if(process.env.NODE_ENV === 'production'){
  UglifyArray.push(new UglifyJSPlugin({}))
}
console.log(JSON.stringify(process.env.NODE_ENV))

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js.js'
  },
  module: {
    rules: [
      {
        test:/\.(less|css)$/,
        use: extractLeSS.extract({
          use:[{
            loader:'css-loader'
          },{
            loader:'postcss-loader'
          },{
            loader:'less-loader',
            options:{
              modifyVars: theme,
              javascriptEnabled: true,
            }
          }
        ]})
      },
      {
        test:/\.(jpe?g|png|gif)$/i,
        use: [{
          loader:'url-loader',
          options:{
            limit:10240,
            name:'imgs/[name].[ext]',
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'QOMS',
      template:'./src/index.html',
    }),
    extractLeSS,
    new webpack.ProvidePlugin({
      'React':'react'
    }),
    ...UglifyArray
  ],
  resolve:{
    modules: [
      'node_modules',
      path.resolve(__dirname, './src'),
    ],
    alias:{
      'common':path.resolve(__dirname, 'src/common/'),
      'utils':path.resolve(__dirname, 'src/utils/'),
      // 'api':Path.resolve(__dirname, 'src/api/'),
    },
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  optimization: {
    splitChunks: {
      cacheGroups:{
        default: false,
        vendors: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          enforce: true,
          priority: 10,
          name: 'vendor'
        }
      }
    }
  },
  devServer: {
    port: 3030,
    open: true,
    proxy: {
      '/erpWebRest': {
        changeOrigin: true,
        target: 'http://v2.qby.testin.qtoolsbaby.net:81',
      },
      '/qtoolsOms': {
        changeOrigin: true,
        target: 'http://v2.qby.testin.qtoolsbaby.net:81',
      }
    }
  }
};
