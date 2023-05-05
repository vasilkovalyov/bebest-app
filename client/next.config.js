/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss')],
  },
  swcMinify: true,
  reactStrictMode: false,
  // basePath: '/',
  // images: {
  //   loader: 'akamai',
  //   path: '',
  // },
  // basePath: '/',
  // assetPrefix: '/learning-platform',
};
