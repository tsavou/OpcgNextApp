import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = withNextIntl({
  /* config options here */
  experimental: {
    typedEnv: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "optcgapi.com",
      },
      {
        protocol: "https",
        hostname: "en.onepiece-cardgame.com",
      },
      {
        protocol: "https",
        hostname: "www.bandainamcocrossstoreuk.com",
      },
    ],
  },
});

export default nextConfig;
