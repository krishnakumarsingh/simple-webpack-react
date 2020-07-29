const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlwebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const glob = require('glob');

const settings = {
  distPath: path.join(__dirname, "dist"),
  srcPath: path.join(__dirname, "src")
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath)
}

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";
  return {
    devtool: isDevMode ? "source-map" : false,
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    // entry: './src/index.js',
    /* output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    }, */
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: ["babel-loader", "ts-loader", "tslint-loader"]
          },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
              test: /\.scss$/,
              use: [
                  "style-loader",
                  {
                      loader: "css-loader",
                      options: {
                          sourceMap: isDevMode
                      }
                  },
                  {
                      loader: "postcss-loader",
                      options: {
                          plugins: [
                              require("autoprefixer")()
                          ],
                          sourceMap: isDevMode
                      }
                  },
                  {
                      loader: "sass-loader",
                      options: {
                          sourceMap: isDevMode
                      }
                  }
              ]
          },
          {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                },
            },
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
              {
                  loader: "file-loader",
                  options: {
                      outputPath: "assets/"
                  }
              }
          ]
      }
        ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ImageminPlugin({
        externalImages: {
          context: '.',
          sources: glob.sync('./src/images/**/*.{png,jpg,jpeg,gif,svg}'),
          destination: './dist/images',
          fileName: '[name].[ext]'
        }
      }),
      new HtmlwebpackPlugin({
          template: srcPathExtend('index.html')
      }),
      new MiniCssExtractPlugin()
    ]
  }
}