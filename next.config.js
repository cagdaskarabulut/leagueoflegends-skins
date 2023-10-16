const generateRobotsTxtAndSitemapXml = require('./scripts/generate-robots-txt');

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['ddragon.leagueoflegends.com'],
},
  webpack(config, { isServer }) {
    if (isServer) {
      generateRobotsTxtAndSitemapXml();
    }
    return config;
  },
};