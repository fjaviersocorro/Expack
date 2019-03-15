const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = (env,argv) => {
    const SERVER_PATH = (argv.mode === 'production') ?
        './src/server/server-prod.js':
        './src/server/server-dev.js'


    return({
        entry: {
            server: SERVER_PATH,
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js'
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename:false,
        },
        externals: [nodeExternals()],
        module:{
            rules:[
                {
                    test: /\.js$/,
                    exclude:/node_modules/,
                    use: {
                        loader:"babel-loader"
                    }
                }
            ]
        }
    })
}



// module.exports = {
//     entry: {
//         server: './src/server/server.js',
//     },
//     output: {
//         path : path.join(__dirname, 'dist'),
//         publicPath: '/',
//         filename: '[name].js'
//     },
//     target: 'node',
//     node:{
//         //Need this when working with express, otherwise the build will fail
//         __dirname: false, //If you don't put this is __dirname,
//         __filename: false //and __filename returns blamk or /
//     },
//     externals: [nodeExternals()], //Needed to avoid error when working with Express
//     module:{
//         //Transpiles ES6-8 to ES-5
//         rules:[
//             {test:/\.js$/,
//             exclude: /node_modules/,
//             use: [
//                 "babel-loader"
//             ]}
//         ]
//     }
// }