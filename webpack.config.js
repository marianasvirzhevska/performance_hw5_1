const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_PAGES = ['page1', 'page2'];
const SHARED_MODULES = 'shared';

const getJSEntry = (entryName) => ({
    [entryName]: {
        import: path.resolve(__dirname, `src/js/${entryName}.js`),
        dependOn: SHARED_MODULES,
    }
});

const getHTMLEntry = (entryName) => ({
    entry: entryName,
    template: `./src/${entryName}.html`,
    filename: `${entryName}.html`,
    chunks: [SHARED_MODULES, entryName],
});

const jsEntries = APP_PAGES.reduce((acc, curr) => {
    return {...acc, ...getJSEntry(curr)};
}, {});

const htmlEntries = APP_PAGES.map((el) =>  new HtmlWebpackPlugin(getHTMLEntry(el)));

module.exports = {
    mode: 'development',
    entry: {
        ...jsEntries,
        [SHARED_MODULES]: path.resolve(__dirname, 'src/js/index.js'),
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
        ...htmlEntries,
    ],
};
