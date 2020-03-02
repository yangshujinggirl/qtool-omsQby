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
let UglifyArray = [], sourceMap="inline-source-map";
console.log(process.env.NODE_ENV === 'production')
if(process.env.NODE_ENV === 'production'){
  UglifyArray.push(new UglifyJSPlugin({
    sourceMap: true,
    uglifyOptions:{
      compress:{
        drop_console: true,
        dead_code: true,
      }
    }
  }));
  sourceMap="source-map"
}
console.log(JSON.stringify(process.env.NODE_ENV))
module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  devtool: sourceMap,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath:'/'
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
      'Req':path.resolve(__dirname,'src/api/Req/'),
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
        },
        common: {
          chunks: "all",
          minChunks: 2,
          name: 'common',
          enforce: true,
          priority: 5
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
        target: 'http://v6.qby.test.qtoolsbaby.net:81',
      },
      '/qtoolsOms': {
        target:'http://192.168.2.37:8001',
        pathRewrite: {"^/qtoolsOms" : ""},
      },
      '/qtoolsErp': {
        target:'http://v6.oms.testin.qtoolsbaby.net:81',
        pathRewrite: {"^/qtoolsErp" : ""},
        changeOrigin: true,
      },
      '/qtoolsApp': {
        target:'http://v6.oms.testin.qtoolsbaby.net:81',
        pathRewrite: {"^/qtoolsApp" : ""},
        changeOrigin: true,
      }
    }
  }
};
