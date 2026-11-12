import type { Metadata } from 'next';
import { HomeContent } from '@/components/native-pages/HomeContent';
import { SitePage } from '@/components/layout/SitePage';
import { PageInteractions } from '@/components/PageInteractions';
export const metadata: Metadata = { title: 'Creative Marketing & Production Agency', alternates: { canonical: '/' } };
export default function Home() { return <SitePage page="home"><HomeContent /><PageInteractions page="home" /></SitePage>; }
