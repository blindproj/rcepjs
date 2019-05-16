const path = require('path');

let config = {
  entry: './lib',
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    filename: 'rcep.min.js',
    library: 'rcepjs'
  }
};

const es5Config = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    }
  ]
};

module.exports = (env, argv) => {

  if (argv.opts) {
    const opts = argv.opts.split(':');
    if (opts.some(opt => opt === 'dev')) {
      config.mode = 'development';
      config.output.filename = 'rcep.js';
    }

    if (opts.some(opt => opt === 'es5')) {
      config.output.path = path.resolve('dist.es5');
      config.module = es5Config;
    }
  }

  return config;
}