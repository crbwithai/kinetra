import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router'
import HeroTrajectories from '../components/HeroTrajectories'
import { useLang } from '../i18n/LangContext'
import { pagePath } from '../i18n/pages'
import { translate } from '../i18n/translate'

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

// Giriş sırası: başlık 1. satır → 2. satır → künye → destek metni → linkler → kaydırma göstergesi.
// Her biri aynı ~120ms ritimle geliyor, tek tek atlanmadan.
const DELAY = {
  line1: 0,
  line2: 0.12,
  kunye: 0.32,
  destek: 0.44,
  links: 0.56,
  scrollHint: 0.68,
}

export default function Hero() {
  const { lang, t } = useLang()
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Hero tam bir ekran boyu kaydırıldığında başlık en fazla 45px yukarı kayar,
  // opaklığı yarıya iner — "abartısız" paralaks için üst sınır bu.
  const titleY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -45])
  const titleOpacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 0.5])

  const homeHref = pagePath('home', lang)
  const kunye = `${translate('tr', 'hero.kunye')} / ${translate('en', 'hero.kunye')}`

  function fadeUpProps(delay: number) {
    return {
      variants: FADE_UP,
      initial: shouldReduceMotion ? false : 'hidden',
      animate: 'visible',
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: 'easeOut' as const },
    }
  }

  return (
    <section ref={heroRef} className="relative -mt-2xl h-dvh overflow-hidden bg-bg-light text-bg-dark">
      <HeroTrajectories
        scrollYProgress={scrollYProgress}
        shouldReduceMotion={Boolean(shouldReduceMotion)}
        heroRef={heroRef}
      />

      <div className="flex h-full flex-col items-start justify-center px-md pb-2xl">
        <motion.p
          {...fadeUpProps(DELAY.kunye)}
          className="mb-md text-label uppercase text-text-muted-light"
        >
          {kunye}
        </motion.p>

        <h1 className="text-display font-heading">
          <motion.span style={{ y: titleY, opacity: titleOpacity }} className="block">
            <motion.span {...fadeUpProps(DELAY.line1)} className="block">
              {t('hero.baslikSatir1')}
            </motion.span>
            <motion.span {...fadeUpProps(DELAY.line2)} className="block">
              {t('hero.baslikSatir2')}
            </motion.span>
          </motion.span>
        </h1>

        <motion.p {...fadeUpProps(DELAY.destek)} className="mt-sm text-body font-body text-text-muted-light">
          {t('hero.destek')}
        </motion.p>
      </div>

      <motion.div {...fadeUpProps(DELAY.links)} className="absolute bottom-0 left-0 flex gap-lg p-md">
        <Link
          to={`${homeHref}#branslar`}
          className="text-body font-body text-bg-dark underline decoration-accent-deep decoration-1 underline-offset-4 outline-none transition-[text-decoration-thickness] duration-200 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-4"
        >
          {t('hero.linkBranslar')}
        </Link>
        <Link
          to={`${homeHref}#teknoloji`}
          className="text-body font-body text-bg-dark underline decoration-accent-deep decoration-1 underline-offset-4 outline-none transition-[text-decoration-thickness] duration-200 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-4"
        >
          {t('hero.linkTeknoloji')}
        </Link>
      </motion.div>

      <motion.div {...fadeUpProps(DELAY.scrollHint)} className="absolute bottom-0 right-0 p-md" aria-hidden="true">
        <div className="relative h-2xl w-px overflow-hidden bg-accent-deep/30">
          <div className="absolute inset-x-0 top-0 h-sm w-px animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-accent-deep motion-reduce:animate-none" />
        </div>
      </motion.div>
    </section>
  )
}
