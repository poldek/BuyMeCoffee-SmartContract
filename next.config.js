/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    INFURA_ID: process.env.INFURA_ID,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
  },
}

module.exports = nextConfig
