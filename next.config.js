const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "img.clerk.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com"
    ]
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true, // Enables the MDX runtime for better compatibility
  }
};

module.exports = withMDX(nextConfig);
