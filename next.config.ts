import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/human-os.html",
        destination: "/human-os",
        permanent: true,
      },
      {
        source: "/work.html",
        destination: "/approach",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/approach",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/perspectives.html",
        destination: "/field-notes",
        permanent: true,
      },
      {
        source: "/field-notes.html",
        destination: "/field-notes",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
