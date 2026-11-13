import { Navbar } from './Navbar';
import { ContextualFooter } from './ContextualFooter';

export function SitePage({ children, page, locale = 'en', contact = false }: { children: React.ReactNode; page?: 'home' | 'about' | 'services' | 'work'; locale?: 'en' | 'ar'; contact?: boolean }) {
  const arabic = locale === 'ar';
  return <div lang={locale} dir={arabic ? 'rtl' : 'ltr'} className="contents"><Navbar arabic={arabic} />{children}{!contact && <ContextualFooter page={page ?? 'home'} arabic={arabic} />}</div>;
}
