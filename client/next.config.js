/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
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
