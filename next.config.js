/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost', 'start-hub.kr'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/:path*',
      },
    ];
  },
  webpack(config) {
    // SVG를 React Component로 import하기 위한 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
            exportType: 'named',
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;