const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "img.clerk.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "utfs.io",
    ],
  },
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

module.exports = withMDX(nextConfig);
