const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com', protocol: 'https', port: '' },
      { hostname: 'technodevlabs.s3.eu-west-2.amazonaws.com', protocol: 'https', port: '' },
      { hostname: 'images.unsplash.com', protocol: 'https', port: '' }
    ]
  },
  experimental: { serverActions: { bodySizeLimit: '7mb' } }
}

module.exports = withNextIntl(nextConfig)
