/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/astha-news/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.prothomalo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prothomalo.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
