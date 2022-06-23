const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        page1: {
            import: path.resolve(__dirname, 'src/js/page1.js'),
            dependOn: 'shared',
        },
        page2: {
            import: path.resolve(__dirname, 'src/js/page2.js'),
            dependOn: 'shared',
        },
        shared: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        ['@babel/preset-env', {
                            useBuiltIns: 'usage',
                            targets: {
                              esmodules: true
                            }
                          }]
                        ]
                    }
                }
            },
        ],
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            entry: 'page1',
            template: './src/page1.html',
            filename: 'page1.html',
            chunks: ['shared', 'page1'],
        }),
        new HtmlWebpackPlugin({
            entry: 'page2',
            template: './src/page2.html',
            filename: 'page2.html',
            chunks: ['shared', 'page2'],
        }),
    ],
};
