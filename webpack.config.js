// configure webpack 5 to bundle our static modules
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { presets: babelPresets } = require('./babel.config');

// store source and dist paths for frequent use later
const PATH_SOURCE = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './dist');

// The entry point(s) into application and where Webpack will start.
// Generally one entry point per HTML page.
// For Single-Page Apps, this means one entry point.
// For traditional multi-page apps, there may be multiple entry points.
// https://webpack.js.org/concepts#entry
const entry = [path.join(PATH_SOURCE, './index.js')];

// Where to emit the bundles it creates and how to name them.
// https://webpack.js.org/concepts#output
// https://webpack.js.org/configuration/output#outputFilename
const output = {
  path: PATH_DIST,
  // [name] is the entry name, and [hash] is a hash of the bundle contents
  filename: 'js/[name].[hash].js',
};

// Determine how the different types of modules will be treated.
// https://webpack.js.org/configuration/module
// https://webpack.js.org/concepts#loaders
const webpackModule = {
  rules: [
    {
      test: /\.js$/, // Apply this rule to files ending in .js
      exclude: /node_modules/, // Don't apply to files residing in node_modules
      // Use the following loader and options
      use: {
        // babel-loader transform code using babel before loading into webpack
        loader: 'babel-loader',
        // We can pass options to both babel-loader and Babel.
        // This option object will replace babel.config.js
        options: {
          presets: babelPresets,
        },
      },
    },
  ],
};

// additional features for webpack
const plugins = [
  // Html-webpack-plugin generate an HTML5 file that...
  // ...imports all Webpack bundles using <script> tags.
  // The file will be placed in `output.path`.
  // https://github.com/jantimon/html-webpack-plugin
  new HtmlWebpackPlugin({
    template: path.join(PATH_SOURCE, './index.html'),
  }),
  // clean-webpack-plugin wipes all files in `output.path` (the dist directory)
  // https://github.com/johnagan/clean-webpack-plugin
  new CleanWebpackPlugin(),
];

// Configuration options for Webpack DevServer, an Express web server that
// aids with development. It provides live reloading out of the box and can
// be configured to do a lot more.
const devServer = {
  // The dev server will serve content from this directory.
  contentBase: PATH_DIST,

  // Specify a host. (Defaults to 'localhost'.)
  host: 'localhost',

  // Specify a port number on which to listen for requests.
  port: 8080,

  // When using the HTML5 History API (you'll probably do this with React
  // later), index.html should be served in place of 404 responses.
  historyApiFallback: true,

  // Show a full-screen overlay in the browser when there are compiler
  // errors or warnings.
  overlay: {
    errors: true,
    warnings: true,
  },
};

// Export a configuration object
// If we export as function instead, it passes two parameters.
// The first is the webpack command line environment option `--env`.
// `webpack --env.production` sets env.production = true
// `webpack --env.a = b` sets env.a = 'b'
// https://webpack.js.org/configuration/configuration-types#exporting-a-function
module.exports = (env) => {
  const { environment } = env;
  /* const isProduction = environment === 'production';
  const isDevelopment = environment === 'development'; */
  return {
    // Optimizations for our environment (development or production).
    // Webpack will enable certain plugins and set
    // `process.env.NODE_ENV` according to the environment we specify.
    // https://webpack.js.org/configuration/mode
    mode: environment || 'development', // development by default if unspecified

    entry,

    output,

    module: webpackModule,

    plugins,

    devServer,
  };
};

/* TLDR;
Bundle mode optimized depending on the '--env' command line environment option given.
The mode is '--env.enviroment' (either 'production' or 'development')

Entry point is ./src/index.js

Compiled bundle will be emitted to ./dist/js/[name].[hash].js.

Applied rules to all modules ending in js besides node_modules to...
...use babel-loader and babel config to transform code using babel before loading into webpack

Applied plugins for extra functionality:
- Generate html5 and put bundle in <script> tag
- Wipes clean output.path to avoid piling up old bundles

Configure a development server to ease dev work with features like live reloading and more.
*/
