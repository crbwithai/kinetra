import { Link } from 'react-router'
import { useLang } from '../i18n/LangContext'
import { pagePath } from '../i18n/pages'
import { useCart } from '../lib/CartContext'
import LangSwitcher from './LangSwitcher'
import { Logo } from './Logo'
import { NAV_ITEMS } from './navItems'

export default function Footer() {
  const { lang, t } = useLang()
  const { open: openCart } = useCart()
  const homeHref = pagePath('home', lang)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-text-muted-dark/30 bg-bg-dark text-bg-light">
      <div className="flex flex-col gap-lg px-md py-xl tablet:flex-row tablet:items-start tablet:justify-between">
        <div className="flex flex-col gap-sm">
          <Link to={homeHref} aria-label="KINETRA">
            <Logo variant="wordmark" size={20} decorative />
          </Link>
          <p className="text-body font-body text-text-muted-dark">{t('footer.tagline')}</p>
        </div>

        <ul className="flex flex-col gap-sm tablet:flex-row tablet:gap-lg">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              {item.id === 'sepet' ? (
                <button
                  type="button"
                  onClick={openCart}
                  className="text-label uppercase outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-4"
                >
                  {t(item.labelKey)}
                </button>
              ) : (
                <Link
                  to={`${homeHref}#${item.id}`}
                  className="text-label uppercase outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-4"
                >
                  {t(item.labelKey)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-sm tablet:items-end">
          <LangSwitcher />
          <p className="text-label text-text-muted-dark">{t('footer.copyright').replace('{year}', String(year))}</p>
        </div>
      </div>
    </footer>
  )
}
