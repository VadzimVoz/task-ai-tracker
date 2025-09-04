/** @type {import('next').NextConfig} */
const nextConfig = {
  // config options here
};
const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
};

module.exports = nextConfig;
