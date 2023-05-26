/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    dev: false,
    exposeSidebar: false,
    modeForDebugging: 'Block',
    POLYGON_MUMBAI_ALCHEMY_API_KEY: process.env.POLYGON_MUMBAI_ALCHEMY_API_KEY
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['src'],
  },
  typescript: {
    ignoreBuildErrors: true
  },

  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
