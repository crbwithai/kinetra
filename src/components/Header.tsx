import { Link } from 'react-router'
import { useLang } from '../i18n/LangContext'
import { pagePath } from '../i18n/pages'
import { useScrolled } from '../lib/useScrolled'
import LangSwitcher from './LangSwitcher'
import { Logo } from './Logo'
import MobileMenu from './MobileMenu'
import { NAV_ITEMS } from './navItems'

export default function Header() {
  const { lang, t } = useLang()
  const scrolled = useScrolled(8)
  const homeHref = pagePath('home', lang)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-2xl text-bg-light transition-[background-color,backdrop-filter] duration-300 motion-reduce:transition-none ${
        scrolled ? 'bg-bg-dark/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex h-full items-center justify-between px-md">
        <Link to={homeHref} aria-label="KINETRA">
          <Logo variant="full" size={32} decorative />
        </Link>

        <nav className="hidden items-center gap-lg tablet:flex" aria-label={t('nav.mainLabel')}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={`${homeHref}#${item.id}`}
              className="text-label relative uppercase outline-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent-bright after:transition-[width] after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-4 focus-visible:after:w-full motion-reduce:after:transition-none"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-md">
          <div className="hidden tablet:block">
            <LangSwitcher />
          </div>
          <MobileMenu homeHref={homeHref} />
        </div>
      </div>
    </header>
  )
}
