/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  async rewrites() {
    return [
      {
        source: process.env.NEXT_PUBLIC_CAPICK_API_URL + "/:path*",
        destination: process.env.CAPICK_API_URL + "/:path*",
      }
    ]
  },
}

module.exports = nextConfig
