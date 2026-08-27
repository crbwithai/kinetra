import ShowcaseBranchBlock from '../components/ShowcaseBranchBlock'
import { DEEP_SHOWCASES } from '../data/products'
import { useLang } from '../i18n/LangContext'

const SHOWCASE_LIST = Object.values(DEEP_SHOWCASES)

export default function DeepShowcase() {
  const { t } = useLang()

  return (
    <section id="vitrin" className="scroll-mt-2xl bg-bg-light px-md py-3xl text-bg-dark">
      <header className="mb-lg text-left">
        <h2 className="text-heading font-heading">{t('deepShowcase.baslik')}</h2>
        <p className="mt-sm text-body font-body text-text-muted-light">{t('deepShowcase.giris')}</p>
      </header>

      <div className="flex flex-col gap-3xl">
        {SHOWCASE_LIST.map((showcase) => (
          <ShowcaseBranchBlock key={showcase.branchId} showcase={showcase} />
        ))}
      </div>
    </section>
  )
}
