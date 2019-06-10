const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/js/functional.js",
    // devtool: "cheap-module-source-map",
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
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "bundle.js"
    }
};