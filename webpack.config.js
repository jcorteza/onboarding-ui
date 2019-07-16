const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ttf|wof|eot|woff2|woff)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        compress: true,
        port: 9000
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/public/",
        filename: "bundle.js"
    }
};