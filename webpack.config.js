const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlwebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      ident: 'postcss',
                      plugins: [
                        require('tailwindcss'),
                        require('autoprefixer')
                      ]
                    }
                  }
                ],
            }
        ]
    },
    plugins: [
        new ImageminPlugin({
          externalImages: {
            context: '.',
            sources: glob.sync('./src/images/**/*.{png,jpg,jpeg,gif,svg}'),
            destination: './dist/images',
            fileName: '[name].[ext]'
          }
        }),
        new HtmlwebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}