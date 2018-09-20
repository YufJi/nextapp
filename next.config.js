const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  webpack: (config, { dev }) => {
    config.resolve.extensions = ['.web.js', '.js', '.json'];

    return config;
  },
});
