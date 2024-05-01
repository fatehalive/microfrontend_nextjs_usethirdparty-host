const fs = require('fs');
const path = require('path');
const NextFederationPlugin = require('@module-federation/nextjs-mf');

// Build the path to the JSON file
const jsonPath = path.resolve(__dirname, './package.json');

// Read the JSON file synchronously
const jsonString = fs.readFileSync(jsonPath, 'utf8');

// Parse the JSON string into an object
const pkg = JSON.parse(jsonString);
const deps = pkg.dependencies;

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    remote: `remote@http://localhost:3001/_next/static/${location}/remoteEntry.js`
  };
};

const shareConfig = {
  ...deps,
  react: {
    eager: true
  }
}

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(options.isServer),
        // shared: shareConfig,
      }),
    );

    return config;
  },
};