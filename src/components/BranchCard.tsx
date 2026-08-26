import { motion, useReducedMotion } from 'framer-motion'
import type { Branch } from '../data/products'
import { useLang } from '../i18n/LangContext'
import { translate } from '../i18n/translate'

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

// Henüz bir bağlantı değil — derin vitrin sayfaları gelene kadar tıklanamaz,
// sadece görsel olarak "canlı" (hover tepkisi var). Bağlantıya çevrilince
// klavye erişimi (focus-visible vb.) o zaman eklenecek.
export default function BranchCard({ branch, delay }: { branch: Branch; delay: number }) {
  const { t } = useLang()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group"
      variants={FADE_UP}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="relative aspect-square overflow-hidden bg-bg-light/20">
        <span className="absolute inset-0 flex items-center justify-center text-display font-heading text-bg-dark/30 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          {branch.number}
        </span>
      </div>

      <p className="mt-sm text-label uppercase">
        <span className="transition-colors duration-200 group-hover:text-accent-bright">{branch.number}</span>
        {' / '}
        {translate('tr', branch.termKey)} / {translate('en', branch.termKey)}
      </p>

      <p className="mt-1 text-body font-body">{t(branch.signatureProductNameKey)}</p>
    </motion.article>
  )
}
