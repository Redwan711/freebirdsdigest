/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400, // Cache optimized images for 31 days
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "server.freebirdsdigest.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "server.freebirdsdigest.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "freebirdsdigest.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.freebirdsdigest.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.wordpress.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/go/nordvpn",
        destination: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=156559&url_id=902",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

