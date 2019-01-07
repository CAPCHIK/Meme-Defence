const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './build/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  mode: 'production',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  }
};