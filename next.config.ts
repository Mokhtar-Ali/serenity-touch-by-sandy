import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ec6b76c0eef842d1bd7d65492c044988.r2.dev',
        pathname: '/Serenity%20Touch%20By%20Sandy/**',
      },
    ],
  },
};

export default nextConfig;
