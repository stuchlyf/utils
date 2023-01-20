const { version } = require('./package.json');
const withPWA = require('next-pwa')({
  dest: 'public'
})

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
