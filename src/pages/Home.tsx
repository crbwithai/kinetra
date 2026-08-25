import { NAV_ITEMS } from '../components/navItems'
import { useLang } from '../i18n/LangContext'
import { useSeo } from '../i18n/useSeo'
import Hero from '../sections/Hero'

// GEÇİCİ — Hero dışındaki yer tutucu bölümler, sayfayı kaydırılabilir kılmak
// ve header'ın hem açık hem koyu zeminde okunur kaldığını test etmek için tam
// ekran yükseklik + dönüşümlü zemin alıyor. Gerçek bölümler gelince kaldırılacak.
export default function Home() {
  const { t } = useLang()
  useSeo('home')

  return (
    <>
      <Hero />

      {NAV_ITEMS.map((item, i) => {
        const isDark = i % 2 === 0
        return (
          <section
            key={item.id}
            id={item.id}
            className={`flex min-h-dvh scroll-mt-2xl items-center justify-center ${
              isDark ? 'bg-bg-dark text-bg-light' : 'bg-bg-light text-bg-dark'
            }`}
          >
            <p className="text-display font-heading">{t(item.labelKey)}</p>
          </section>
        )
      })}
    </>
  )
}
