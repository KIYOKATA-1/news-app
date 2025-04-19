/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
};

module.exports = nextConfig;
