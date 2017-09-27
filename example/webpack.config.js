const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: {
        app: './index.js'
    },

    output: {
        path: __dirname + '/assets',
        filename: '[name].js'
    },

    plugins: [
        new Uglify()
    ]
};
