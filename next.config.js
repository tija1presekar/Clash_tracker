/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cocbases.org',
      },
      {
        protocol: 'https',
        hostname: 'api-assets.clashofclans.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;