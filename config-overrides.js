/* config-overrides.js */
const rewireProvidePlugin = require('react-app-rewire-provide-plugin')

module.exports = function override(config, env) {
  // Use `webpack.ProvidePlugin` to add jQuery globally
  config = rewireProvidePlugin(config, env, {
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  })
  return config;
}



/////////////////////////////
// Alternative:
///////////////////////////////

// /* config-overrides.js */
// const rewireProvidePlugin = require('react-app-rewire-provide-plugin')
// const {
//     getLoader,
//     injectBabelPlugin
// } = require("react-app-rewired");
// const tsImportPluginFactory = require("ts-import-plugin")
//
//
// module.exports = function override(config, env) {
//   // Use `webpack.ProvidePlugin` to add jQuery globally
//   config = rewireProvidePlugin(config, env, {
//     $: "jquery",
//     jQuery: "jquery",
//     "window.jQuery": "jquery"
//   })
//
//   // do stuff with the webpack config...
//   const tsLoader = getLoader(
//       config.module.rules,
//       rule =>
//       rule.loader &&
//       typeof rule.loader === 'string' &&
//       rule.loader.includes('ts-loader')
//   );
//
//   tsLoader.options = {
//       getCustomTransformers: () => ({
//           before: [
//               tsImportPluginFactory([{
//                   libraryDirectory: 'es',
//                   libraryName: 'material-ui',
//                   style: 'css',
//               }]),
//           ]
//       })
//   };
//   return config;
// }
