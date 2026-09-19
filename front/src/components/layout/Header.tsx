import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, Phone, X } from 'lucide-react';
import { navLinks, site } from '@/data/site';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useUiStore } from '@/store/useUiStore';
import Container from '@/components/ui/Container';

const sectionIds = navLinks.map((link) => link.id);

/**
 * En-tete fixe, clair sur toute la hauteur du site.
 *
 * Il ne bascule plus entre transparent et opaque : le hero est desormais sur
 * fond blanc, un en-tete transparent y serait illisible. Un fond constant
 * supprime aussi le clignotement au tout debut du defilement.
 */
export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const activeSection = useScrollSpy(sectionIds);

  const isMobileMenuOpen = useUiStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUiStore((state) => state.closeMobileMenu);

  // Le menu mobile est un panneau plein ecran : on bloque le defilement derriere.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobileMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeMobileMenu]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-mist-300 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-18 items-center justify-between gap-6">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-sm font-semibold leading-tight text-navy-900 sm:text-base"
            aria-label={`${site.fullName}, retour à l'accueil`}
          >
            {site.lastName} <span className="text-blue-600">{site.firstName}</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = isHome && activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={hrefFor(link.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative py-2 text-sm transition-colors ${
                        isActive ? 'text-blue-600' : 'text-ink-700 hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-blue-600 transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.national}
            </a>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="menu-mobile"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="rounded-sm p-2 text-navy-900 transition-colors hover:text-blue-600 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="menu-mobile"
        hidden={!isMobileMenuOpen}
        className="border-t border-mist-300 bg-white lg:hidden"
      >
        <Container>
          <nav aria-label="Navigation mobile" className="py-6">
            <ul className="flex flex-col divide-y divide-mist-300">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={hrefFor(link.id)}
                    onClick={closeMobileMenu}
                    className="block py-4 text-base text-navy-900 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.phone.href}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white"
            >
              <Phone className="size-4" aria-hidden="true" />
              Appeler le {site.phone.national}
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
