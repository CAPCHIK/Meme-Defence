const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'build/'),
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: ['node_modules', '../shared'],
    alias: {
      hiredis: path.join(__dirname, 'aliases/hiredis.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};
