const { version } = require('./package.json');

/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  experimental: {
    appDir: true
  },
  publicRuntimeConfig: {
    version
  },
  output: 'standalone'
}

module.exports = nextConfig
