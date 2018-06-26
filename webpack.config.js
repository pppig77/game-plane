var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:  ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },      
        {
            test: /\.png$/, 
            use:'file-loader' 
        }
        ]
    },
    plugins:[
    new CleanWebpackPlugin('dist/*.*'),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
        template:'src/index.html',
        filename: 'index.html'
    }),
    new CopyWebpackPlugin([{
        from:__dirname+'/src/img',to:'./img'
    }]),
    new ExtractTextPlugin("styles.css")
    ]
}