const path = require('path');

module.exports = {
  entry: './build/server/index.js',
  target: 'node',
  mode: 'production',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: {
      'hiredis': path.join(__dirname, 'aliases/hiredis.js')
    }
  }
};