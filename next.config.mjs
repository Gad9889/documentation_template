/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for development
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**", // Allow any path under this hostname
      },
    ],
  },
};

export default nextConfig;
