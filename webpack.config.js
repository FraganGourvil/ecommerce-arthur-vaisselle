const path = require('path');
//const webpack = require("webpack");

module.exports = module.exports = {
    entry: ['./src/js/index.js', './src/scss/app.scss'],
    module:{
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src/js')]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/css/[name].css'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
                include: [path.resolve(__dirname, 'src/scss')]
            }
        ]
    },
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist')
    }
};