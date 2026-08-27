import { NAV_ITEMS } from '../components/navItems'
import { useLang } from '../i18n/LangContext'
import { useSeo } from '../i18n/useSeo'
import BranchWall from '../sections/BranchWall'
import DeepShowcase from '../sections/DeepShowcase'
import Hero from '../sections/Hero'
import Istatistikler from '../sections/Istatistikler'
import Teknoloji from '../sections/Teknoloji'

const DONE_IDS = new Set(['branslar', 'vitrin', 'teknoloji', 'sepet'])
const REMAINING_PLACEHOLDERS = NAV_ITEMS.filter((item) => !DONE_IDS.has(item.id))

// GEÇİCİ — Hero, BranchWall ve DeepShowcase dışındaki yer tutucu bölümler,
// sayfayı kaydırılabilir kılmak ve header'ın hem açık hem koyu zeminde okunur
// kaldığını test etmek için tam ekran yükseklik + dönüşümlü zemin alıyor.
// Gerçek bölümler gelince kaldırılacak.
export default function Home() {
  const { t } = useLang()
  useSeo('home')

  return (
    <>
      <Hero />
      <BranchWall />
      <DeepShowcase />
      <Teknoloji />
      <Istatistikler />

      {REMAINING_PLACEHOLDERS.map((item, i) => {
        const isDark = i % 2 !== 0
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
