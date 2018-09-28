/*
Simple webpack configuration to create a UMD wrapper for a library
*/

let Path = require('path');
let Webpack = require('webpack');
let WebpackShellPlugin = require('webpack-shell-plugin');

let rootDir = Path.resolve(__dirname, '..');
let packageObj = require(Path.join(rootDir, 'package.json'));

let name = packageObj.name;
let version = packageObj.version;
let repositoryUrl = (typeof packageObj.repository === 'object') ? packageObj.repository.url : '';

let bannerMessage = `
    ${ name } v${ version }
    ${ repositoryUrl }
`;

let webpackConfig = {

    entry: Path.join(rootDir, 'src/index.js'),

    output: {
        path: Path.join(rootDir, 'dist'),
        filename: Path.join(`${ name }.js`),
        library: 'TreeRouter',
        libraryExport: 'default',
        libraryTarget: 'umd',
        // umdNamedDefine: '...'   // 'will name the AMD module of the UMD build. Otherwise an anonymous define is used.'
    },

    // https://webpack.js.org/configuration/externals/

    // exclude dependencies from the output bundles; the created bundle relies on 
    // that dependency to be present in the consumer's environment
    // ("consumer" here is any end user application that includes the library that you 
    // have bundled using webpack.

    externals: {

        "underscore": {
            commonjs: "underscore",
            commonjs2: "underscore",
            amd: "underscore",
            root: "_"
        },

    },

    plugins: [
        new Webpack.BannerPlugin({ banner: bannerMessage}),

        new WebpackShellPlugin({
            onBuildExit:[`node ${ Path.join(rootDir, 'build/post-process.js') } `]
        })
    ]
    
};

module.exports = webpackConfig;

