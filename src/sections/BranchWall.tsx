import BranchCard from '../components/BranchCard'
import { BRANCHES } from '../data/products'
import { useLang } from '../i18n/LangContext'

const BRANCH_LIST = Object.values(BRANCHES)

export default function BranchWall() {
  const { t } = useLang()

  return (
    <section id="branslar" className="scroll-mt-2xl bg-bg-dark px-md py-3xl text-bg-light">
      <header className="mb-lg text-left">
        <h2 className="text-heading font-heading">{t('branchWall.baslik')}</h2>
        <p className="mt-sm text-body font-body text-text-muted-dark">{t('branchWall.giris')}</p>
      </header>

      <div className="grid grid-cols-2 gap-md tablet:grid-cols-3 desktop:grid-cols-4">
        {BRANCH_LIST.map((branch, i) => (
          <BranchCard key={branch.id} branch={branch} delay={(i % 4) * 0.05} />
        ))}
      </div>
    </section>
  )
}
