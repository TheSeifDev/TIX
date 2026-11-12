import type { Metadata } from 'next';
import { LegacyPage } from '@/components/legacy-page';
export const metadata: Metadata = { title: 'وكالة إبداعية وتسويقية', description: 'استوديو إبداعي وتسويقي متكامل في الإسكندرية، مصر.', alternates: { canonical: '/ar/' } };
export default function ArabicHome() { return <LegacyPage page="arabic" />; }
