import Script from 'next/script';
import { getLegacyBody, type LegacyPageKey } from '@/lib/legacy-page';

export function LegacyPage({ page }: { page: LegacyPageKey }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: getLegacyBody(page) }} />
      <Script src="/js/layout.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
