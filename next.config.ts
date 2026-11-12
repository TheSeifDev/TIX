import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https://tixstudio.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'; upgrade-insecure-requests" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/ar/index.html', destination: '/ar/', permanent: true },
      { source: '/pages/about.html', destination: '/about', permanent: true },
      { source: '/pages/services.html', destination: '/services', permanent: true },
      { source: '/pages/work.html', destination: '/work', permanent: true },
      { source: '/pages/contact.html', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
