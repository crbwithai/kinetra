import TechCard from '../components/TechCard'
import { TECHNOLOGIES } from '../data/products'
import { useLang } from '../i18n/LangContext'

// Izgaradaki asimetrik yerleşim — CLAUDE.md §6'nın bu bölüm için istediği deneme.
// col-span/col-start genişlikleri (6/5/5/6) otomatik olarak iki satıra düşer
// (satır 1: kart 1-2, satır 2: kart 3-4); mt-* yalnızca kendi hücresi içinde
// görsel dikey kayma verir, satır yüksekliği en uzun karta göre büyüdüğü için
// taşma riski yok.
const GRID_LAYOUT: Record<string, string> = {
  kinegrip: 'desktop:col-span-6',
  terracell: 'desktop:col-span-5 desktop:col-start-8 desktop:mt-2xl',
  hydroskin: 'desktop:col-span-5 desktop:mt-lg',
  aeromesh: 'desktop:col-span-6 desktop:col-start-7 desktop:mt-sm',
}

const TECH_LIST = Object.values(TECHNOLOGIES)

export default function Teknoloji() {
  const { t } = useLang()

  return (
    <section id="teknoloji" className="scroll-mt-2xl bg-bg-dark px-md py-3xl text-bg-light">
      <header className="mb-lg text-left">
        <h2 className="text-heading font-heading">{t('teknoloji.baslik')}</h2>
        <p className="mt-sm text-body font-body text-text-muted-dark">{t('teknoloji.giris')}</p>
      </header>

      <div className="grid grid-cols-1 gap-md tablet:grid-cols-2 desktop:grid-cols-12">
        {TECH_LIST.map((tech, i) => (
          <TechCard key={tech.id} technology={tech} delay={(i % 4) * 0.05} className={GRID_LAYOUT[tech.id]} />
        ))}
      </div>
    </section>
  )
}
