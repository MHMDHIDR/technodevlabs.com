/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com', protocol: 'https', port: '' },
      { hostname: 'technodevlabs.s3.eu-west-2.amazonaws.com', protocol: 'https', port: '' }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  }
}

export default nextConfig
