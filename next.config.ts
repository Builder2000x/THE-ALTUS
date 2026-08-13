import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  distDir: '.next-build-warm',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
}

export default nextConfig
