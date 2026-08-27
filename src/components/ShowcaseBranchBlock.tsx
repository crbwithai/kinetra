import type { DeepShowcase } from '../data/products'
import { BRANCHES } from '../data/products'
import { useLang } from '../i18n/LangContext'
import { translate } from '../i18n/translate'
import ShowcaseProductCard from './ShowcaseProductCard'

export default function ShowcaseBranchBlock({ showcase }: { showcase: DeepShowcase }) {
  const { t } = useLang()
  const branch = BRANCHES[showcase.branchId]

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-baseline gap-md">
        <h3 className="text-label uppercase">
          {branch.number} / {translate('tr', branch.termKey)} / {translate('en', branch.termKey)}
        </h3>
        <p className="text-body font-body text-text-muted-light">{t(showcase.blurbKey)}</p>
      </div>

      <div className="grid grid-cols-1 gap-md tablet:grid-cols-2 desktop:grid-cols-4">
        {showcase.products.map((product, i) => (
          <ShowcaseProductCard
            key={product.id}
            product={product}
            branchId={showcase.branchId}
            delay={(i % 4) * 0.05}
          />
        ))}
      </div>
    </div>
  )
}
