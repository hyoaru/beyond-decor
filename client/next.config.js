/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https', 
        hostname: 'ralndezcjewfbfobbtjy.supabase.co',
        port: '',
        pathname: '/**'
      },

      {
        protocol: 'http', 
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/**'
      },

      {
        protocol: 'https',
        hostname: 'beyond-decor.pockethost.io',
        port: '',
        pathname: '/**'
      }
    ],
  },
}

module.exports = nextConfig
