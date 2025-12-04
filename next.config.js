/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    serverComponentsExternalPackages: ['prisma'],
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeServerReact: true,
  },

  // Font optimization
  optimizeFonts: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.omthakur.tech',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Font preconnect headers for Google Fonts
          {
            key: 'Link',
            value: '<https://fonts.googleapis.com>; rel=preconnect; crossorigin, <https://fonts.gstatic.com>; rel=preconnect; crossorigin'
          },
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Performance headers
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          },
        ],
      },
      // Cache static assets
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // Cache fonts
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect old blog URLs
      {
        source: '/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      // Redirect old portfolio URLs
      {
        source: '/work/:slug*',
        destination: '/portfolio/:slug*',
        permanent: true,
      },
      // Redirect old contact URLs
      {
        source: '/contact-me',
        destination: '/contact',
        permanent: true,
      },
    ]
  },

  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
      },
      {
        source: '/rss',
        destination: '/feed.xml',
      },
    ]
  },

  // Bundle analyzer (comment out in production)
  // webpack: (config, { isServer }) => {
  //   if (process.env.ANALYZE === 'true') {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'server',
  //         analyzerPort: isServer ? 8888 : 8889,
  //         openAnalyzer: true,
  //       })
  //     )
  //   }
  //   return config
  // },

  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Minimize JavaScript
    swcMinify: true,
    
    // Remove console logs in production
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
  }),

  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if type errors are present
    // ignoreBuildErrors: false, // Set to true only if absolutely necessary
  },

  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if ESLint errors are present
    // ignoreDuringBuilds: false, // Set to true only if absolutely necessary
  },
}

module.exports = nextConfig