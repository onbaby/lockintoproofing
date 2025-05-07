/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/services/gutter-repairs',
        destination: '/services/gutter-services',
        permanent: true,
      },
      {
        source: '/services/tiling',
        destination: '/services/flooring',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 