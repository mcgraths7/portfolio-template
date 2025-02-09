/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io`,
        port: '',
      }
    ],
  },
}

module.exports = nextConfig