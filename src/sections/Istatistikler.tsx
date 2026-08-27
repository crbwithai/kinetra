import CountUp from '../components/CountUp'
import { BRANCHES, DEEP_SHOWCASES, TECHNOLOGIES } from '../data/products'
import { useLang } from '../i18n/LangContext'

const SIGNATURE_PRODUCT_COUNT = Object.values(DEEP_SHOWCASES).reduce(
  (sum, showcase) => sum + showcase.products.length,
  0,
)

const STATS = [
  { id: 'brans', value: Object.keys(BRANCHES).length, labelKey: 'istatistikler.brans' },
  { id: 'teknoloji', value: Object.keys(TECHNOLOGIES).length, labelKey: 'istatistikler.teknoloji' },
  { id: 'imzaUrun', value: SIGNATURE_PRODUCT_COUNT, labelKey: 'istatistikler.imzaUrun' },
  // Marka iddiası — sitedeki bir verinin sayımı değil, kasıtlı olarak elle yazılı.
  { id: 'saatTest', value: 500, suffix: '+', labelKey: 'istatistikler.saatTest' },
] as const

// 4 öğe, iki farklı ızgarada (mobil/tablet 2x2, masaüstü 4x1) — hairline'ların hangi
// kenarda görüneceği düzene göre değişiyor, bu yüzden index'e göre hesaplanıyor.
function dividerClass(index: number): string {
  return [
    'border-text-muted-light/20',
    index % 2 === 1 && 'border-l',
    index >= 2 && 'border-t desktop:border-t-0',
    index === 2 && 'desktop:border-l',
  ]
    .filter(Boolean)
    .join(' ')
}

export default function Istatistikler() {
  const { t } = useLang()

  return (
    <section id="istatistikler" className="scroll-mt-2xl bg-bg-light px-md py-xl text-bg-dark">
      <div className="grid grid-cols-2 gap-md desktop:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.id} className={`px-md py-sm text-center ${dividerClass(i)}`}>
            <CountUp
              value={stat.value}
              suffix={'suffix' in stat ? stat.suffix : undefined}
              className="text-display font-heading text-accent-deep"
            />
            <p className="mt-xs text-label uppercase text-text-muted-light">{t(stat.labelKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
