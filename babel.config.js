// config Babel to transform modern js to old versions of js

const presetEnv = [
  '@babel/preset-env',
  // Pass a config object to config this preset
  {
    // Output the targets/plugins used when compiling
    debug: true,
    // Configure how @babel/preset-env handles polyfills from core-js.
    // https://babeljs.io/docs/en/babel-preset-env
    useBuiltIns: 'usage',
    // Specify the core-js version. Must match the version in package.json
    corejs: 3,
    // Specify which environments we support/target.
    // Specified by .browserlistrc instead. Not need for here.
    // targets: "",
  },
];

// The react preset includes several plugins that are required to write
// a React app. For example, it transforms JSX:
// <div> -> React.createElement('div')
const presetReact = '@babel/preset-react';

// using preset
const presets = [presetEnv, presetReact];

// using plugin
const plugins = [];

// Export a config object.
module.exports = { presets, plugins };
