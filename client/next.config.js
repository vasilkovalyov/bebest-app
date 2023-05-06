/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss')],
  },
  swcMinify: true,
  reactStrictMode: false,
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
  },
}
