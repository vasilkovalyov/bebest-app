/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss')],
  },
  swcMinify: true,
  reactStrictMode: false,
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: process.env.API_URL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)
