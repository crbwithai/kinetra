import { NAV_ITEMS } from '../components/navItems'
import { useLang } from '../i18n/LangContext'
import { useSeo } from '../i18n/useSeo'

// GEÇİCİ — yer tutucu bölümlere sayfayı kaydırılabilir kılmak ve header'ın
// hem açık hem koyu zeminde okunur kaldığını test etmek için tam ekran
// yükseklik + dönüşümlü zemin verildi. Gerçek bölümler gelince kaldırılacak.
const PLACEHOLDER_SECTIONS: Array<{ id?: string; labelKey: string }> = [
  { labelKey: 'hero.baslik' },
  ...NAV_ITEMS,
]

export default function Home() {
  const { t } = useLang()
  useSeo('home')

  return (
    <>
      {PLACEHOLDER_SECTIONS.map((section, i) => {
        const isDark = i % 2 === 1
        return (
          <section
            key={section.id ?? 'hero'}
            id={section.id}
            className={`flex min-h-dvh scroll-mt-2xl items-center justify-center ${
              isDark ? 'bg-bg-dark text-bg-light' : 'bg-bg-light text-bg-dark'
            }`}
          >
            <p className="text-display font-heading">{t(section.labelKey)}</p>
          </section>
        )
      })}
    </>
  )
}
