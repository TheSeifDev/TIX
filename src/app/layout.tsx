import type { Metadata } from 'next';
import './native.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tixstudio.com'),
  title: { default: 'TIX Studio | Creative Marketing & Production Agency', template: '%s | TIX Studio' },
  description: 'TIX is a full-service creative and marketing studio based in Alexandria, Egypt.',
  icons: { icon: '/assets/images/tix.webp', apple: '/assets/images/tix.webp' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Legacy styles are served from public unchanged during the parity migration. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,900&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/tokens.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/components.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/home.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/about.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/services.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/work.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/contact.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
