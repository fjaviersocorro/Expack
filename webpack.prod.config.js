const path  = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin =require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require ("optimize-css-assets-webpack-plugin")

module.exports = {
    entry:{
        main: './src/index.js',
    },
    output: {
        path:path.join(__dirname, 'dist'),
        publicPath:'/',
        filename: '[name].js'
    },
    target: 'web',
    devtool: '#source-map',
    //Webpack 4 doesn't have a CSS minifier, although
    //Webpack 5 will likely come with one
    optimization:{
        minimizer: [
            new UglifyJsPlugin({
                cache:true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude:  /node_modules/,
                use: {
                    loader:"babel-loader"
                }
            },
            {
                //Loads the javascript into html template provided
                //
                test: /\.html&/,
                use:[{loader:"html-loader"}]
                //oprtions:{minimize:true}
            },
            {
                test:/\.(css|scss)$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test:/\.(jpg|jpeg|gif|png|mp3|svg)$/,
                use: [{loader: "url-loader"}]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            excludeChunks: ['server']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}