import type { Metadata } from 'next';
import { ArabicHomeContent } from '@/components/native-pages/ArabicHomeContent';
import { SitePage } from '@/components/layout/SitePage';
import { PageInteractions } from '@/components/PageInteractions';
import { LanguageAttributes } from '@/components/layout/LanguageAttributes';
export const metadata: Metadata = { title: 'وكالة إبداعية وتسويقية', description: 'استوديو إبداعي وتسويقي متكامل في الإسكندرية، مصر.', alternates: { canonical: '/ar' } };
export default function ArabicHome() { return <SitePage page="home" arabic><LanguageAttributes arabic /><ArabicHomeContent /><PageInteractions page="home" /></SitePage>; }
