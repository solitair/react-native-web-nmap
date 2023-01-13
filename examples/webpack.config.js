const path = require("path");

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // If you want to add a new alias to the config.
  config.resolve.alias['react-native-nmap'] = 'react-native-web-nmap';
  config.resolve.alias['react'] = path.join(__dirname, './node_modules/react');
  config.resolve.alias['react-dom'] = path.join(__dirname, './node_modules/react-dom');

  // Finally return the new config for the CLI to use.
  return config;
};
