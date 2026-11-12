import { Navbar } from './Navbar';
import { ContextualFooter } from './ContextualFooter';

export function SitePage({ children, page, arabic = false, contact = false }: { children: React.ReactNode; page?: 'home' | 'about' | 'services' | 'work'; arabic?: boolean; contact?: boolean }) {
  return <><Navbar arabic={arabic} />{children}<ContextualFooter page={contact ? 'home' : page ?? 'home'} arabic={arabic} /></>;
}
