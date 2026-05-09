/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        hostname: 'dummyimage.com',
        protocol: 'https',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
