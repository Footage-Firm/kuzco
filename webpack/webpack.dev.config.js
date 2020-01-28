const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        __dirname + '/example/main.js'
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
        },{
            test:  /\.css$/,
            loaders: 'style-loader!css-loader'
        },{
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }]
    },
    output: {
        path:  path.resolve(__dirname, '/example'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/example',
        historyApiFallback: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"development"'}})
    ]
};
