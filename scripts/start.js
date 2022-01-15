// Copyright (c) 2022 Codexpo Technologies.

process.env.NODE_ENV = 'development';
process.on('unhandledRejection', err => {
  throw err;
});

const PORT = 8081;

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.dev.js');

const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  watchOptions: {
    ignored: /node_modules/,
  },
  https: true,
  headers:{
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
});

devServer.listen(PORT, (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log('Development server listening on port ', PORT);
});
