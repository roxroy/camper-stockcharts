var path = require('path');

//var dir_js = path.resolve(__dirname, 'client/\.js$/');
//var dir_html = path.resolve(__dirname, 'html');
var dir_build = path.resolve(__dirname, 'public/build');

module.exports = {
    entry: path.resolve(__dirname, 'client/main.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                //test: dir_js,
            }
        ]
    },
    plugins: [
        //// Simply copies the files over
        //new CopyWebpackPlugin([
        //    { from: dir_html } // to: output.path
        //]),
    ],
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};