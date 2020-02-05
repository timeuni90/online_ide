const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    devtool: isProd ? false : "#cheap-module-source-map",
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/dist/",
        filename: "[name].[chunkhash].js"
    },
    resolve: {
        alias: {
            public: path.resolve(__dirname, "../public")
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                // 重要：使用 vue-style-loader 替代 style-loader
                use: isProd
                    ? ExtractTextPlugin.extract({
                          use: "css-loader",
                          fallback: "vue-style-loader"
                      })
                    : ["vue-style-loader", "css-loader"]
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: isProd
        ? [
              new VueLoaderPlugin(),
              new webpack.optimize.UglifyJsPlugin({
                  compress: { warnings: false }
              }),
              new webpack.optimize.ModuleConcatenationPlugin(),
              new ExtractTextPlugin({
                  filename: "common.[chunkhash].css"
              })
          ]
        : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()]
};
