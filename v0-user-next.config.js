/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeholder.com"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

