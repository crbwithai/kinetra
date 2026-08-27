import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function CountUp({
  value,
  suffix = '',
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduceMotion = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (shouldReduceMotion) {
      count.set(value)
      return
    }
    if (!isInView) return
    const controls = animate(count, value, { duration: 1, ease: 'easeOut' })
    return controls.stop
  }, [isInView, shouldReduceMotion, count, value])

  return (
    <p ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </p>
  )
}
