/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/intelligence",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/intelligence/:slug*",
        permanent: true,
      },
      {
        source: "/lenders",
        destination: "/lender-risk-index",
        permanent: true,
      },
      {
        source: "/lenders/:slug*",
        destination: "/lender-risk-index/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
