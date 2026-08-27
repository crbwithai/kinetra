import { motion, useReducedMotion } from 'framer-motion'
import type { Technology } from '../data/products'
import { useLang } from '../i18n/LangContext'
import { translate } from '../i18n/translate'
import { FADE_UP } from '../lib/fadeUpVariant'

export default function TechCard({
  technology,
  delay,
  className,
}: {
  technology: Technology
  delay: number
  className?: string
}) {
  const { t } = useLang()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className={className}
      variants={FADE_UP}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: 'easeOut' }}
    >
      <p className="text-label uppercase text-text-muted-dark">
        {technology.number} / {translate('tr', technology.termKey)} / {translate('en', technology.termKey)}
      </p>

      <p className="mt-sm text-heading font-heading text-accent-bright">{technology.name}</p>

      <p className="mt-sm text-body font-body">{t(technology.claimKey)}</p>
      <p className="mt-1 text-body font-body text-text-muted-dark">{t(technology.evidenceKey)}</p>
    </motion.article>
  )
}
