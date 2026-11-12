import type { Metadata } from 'next';
import { LegacyPage } from '@/components/legacy-page';
export const metadata: Metadata = { title: 'Creative Marketing & Production Agency', alternates: { canonical: '/' } };
export default function Home() { return <LegacyPage page="home" />; }
