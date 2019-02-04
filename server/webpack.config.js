const path = require('path');
var WebpackShellPlugin = require('webpack-shell-plugin');

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
    modules: ['node_modules', '../shared/src'],
    alias: {
      hiredis: path.join(__dirname, 'aliases/hiredis.js'),
      '@shared': path.join(__dirname, '../shared/src')
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
  },
  plugins: []
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins.push(new WebpackShellPlugin({onBuildEnd: ['nodemon build/server.js --watch build']}));
}
