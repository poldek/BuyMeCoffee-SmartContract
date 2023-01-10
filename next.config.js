/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ALCHEMY_ID: process.env.ALCHEMY_ID,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
  },
}

module.exports = nextConfig
