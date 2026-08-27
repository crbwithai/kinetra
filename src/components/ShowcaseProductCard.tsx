import { motion, useReducedMotion } from 'framer-motion'
import type { DeepShowcaseBranchId, ShowcaseProduct } from '../data/products'
import { TECHNOLOGIES } from '../data/products'
import { useLang } from '../i18n/LangContext'
import { FADE_UP } from '../lib/fadeUpVariant'
import { formatPrice } from '../lib/formatPrice'
import { useCart } from '../lib/CartContext'
import ResponsiveImage from './ResponsiveImage'

export default function ShowcaseProductCard({
  product,
  branchId,
  delay,
}: {
  product: ShowcaseProduct
  branchId: DeepShowcaseBranchId
  delay: number
}) {
  const { lang, t } = useLang()
  const shouldReduceMotion = useReducedMotion()
  const { addItem } = useCart()
  const tech = TECHNOLOGIES[product.techId]

  return (
    <motion.article
      className="group"
      variants={FADE_UP}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="relative aspect-square overflow-hidden bg-bg-dark/10">
        {product.hasImage && (
          <ResponsiveImage
            src={product.image}
            alt={t(product.altKey)}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </div>

      <p className="mt-sm text-body font-body">{t(product.nameKey)}</p>
      <p className="mt-1 text-label text-text-muted-light">{t(product.descriptionKey)}</p>
      <p className="mt-1 flex flex-wrap items-baseline gap-1 text-label">
        <span className="uppercase text-accent-deep">{tech.name}</span>
        <span className="text-text-muted-light">{t(tech.claimKey)}</span>
      </p>
      <p className="mt-1 text-body font-body">{formatPrice(product.price.amount, lang)}</p>
      <button
        type="button"
        onClick={() => addItem(branchId, product.id)}
        className="mt-sm w-full border border-bg-dark px-md py-xs text-label uppercase text-bg-dark transition-colors duration-200 hover:bg-bg-dark hover:text-bg-light motion-reduce:transition-none"
      >
        {t('cart.addToCart')}
      </button>
    </motion.article>
  )
}
