const generateRobotsTxtAndSitemapXml = require('./scripts/generate-robots-txt');

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      generateRobotsTxtAndSitemapXml();
    }
    return config;
  },
};