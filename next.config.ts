import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict mode for better error detection
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'theaiguides.co',
      },
    ],
  },

  // Redirects for URL preservation
  async redirects() {
    return [
      // WordPress URL patterns to new structure
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/posts',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/posts/',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/resources',
        permanent: true,
      },
      // Trailing slash normalization (handled by Next.js by default)
      // Category and tag redirects if needed
      {
        source: '/category/:slug',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/tag/:slug',
        destination: '/resources',
        permanent: true,
      },
      // Old WordPress author pages
      {
        source: '/author/:slug',
        destination: '/about',
        permanent: true,
      },
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
