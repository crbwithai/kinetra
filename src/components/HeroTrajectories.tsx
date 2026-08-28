import { animate, motion, useInView, type MotionValue, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, type RefObject } from 'react'
import { useIsTabletUp } from '../lib/useIsTabletUp'

type Point = [number, number]

// Fare itme efekti ayarları — ilk denemede ince ayar gerekebilir, o yüzden
// tek yerde adlandırılmış: kod içine gömülmüyor.
const REPEL_RADIUS = 260 // viewBox birimi — bu yarıçapın dışında itme sıfır
const REPEL_MAX_PUSH_LONG_ARC = 16 // arka katman — en az itilir
const REPEL_MAX_PUSH_ACCELERATION_LINE = 28 // orta katman
const REPEL_MAX_PUSH_WAVE = 42 // ön katman — en çok itilir
const REPEL_STIFFNESS = 150
const REPEL_DAMPING = 18

interface TrajectoryLayerProps {
  scrollYProgress: MotionValue<number>
  shouldReduceMotion: boolean
  isInView: boolean
  heroRef: RefObject<HTMLElement | null>
  svgRef: RefObject<SVGSVGElement | null>
}

function buildPathD(points: Point[]): string {
  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i += 3) {
    const [c1, c2, end] = [points[i], points[i + 1], points[i + 2]]
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${end[0]} ${end[1]}`
  }
  return d
}

// Fare hero içinde gezinirken path'e yakın kesimleri fareden uzağa iter.
// Path'in yalnızca 7 asıl noktası (M + 2×C) itilip d string'i yeniden kurulur —
// eğri üzerinde onlarca örnek nokta yeniden hesaplamak yerine (bkz. plan notu).
// Fare konumu ve spring pozisyon/hız değerleri ref'te tutulur, DOM'a doğrudan
// yazılır — React re-render tetiklenmez.
function useTrajectoryRepel(
  pathRef: RefObject<SVGPathElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  heroRef: RefObject<HTMLElement | null>,
  points: Point[],
  maxPush: number,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return
    const hero = heroRef.current
    const svg = svgRef.current
    const path = pathRef.current
    if (!hero || !svg || !path) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const pointer = { clientX: 0, clientY: 0, active: false }
    const n = points.length
    const dx = new Float32Array(n)
    const dy = new Float32Array(n)
    const vx = new Float32Array(n)
    const vy = new Float32Array(n)
    const svgPoint = svg.createSVGPoint()

    let rafId: number | null = null
    let lastTime = 0

    function tick(time: number) {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      let mouseX = Infinity
      let mouseY = Infinity
      if (pointer.active) {
        const ctm = svg!.getScreenCTM()
        if (ctm) {
          svgPoint.x = pointer.clientX
          svgPoint.y = pointer.clientY
          const svgPos = svgPoint.matrixTransform(ctm.inverse())
          mouseX = svgPos.x
          mouseY = svgPos.y
        }
      }

      let maxMovement = 0
      for (let i = 0; i < n; i++) {
        let targetX = 0
        let targetY = 0
        if (pointer.active) {
          const diffX = points[i][0] - mouseX
          const diffY = points[i][1] - mouseY
          const dist = Math.sqrt(diffX * diffX + diffY * diffY)
          if (dist < REPEL_RADIUS) {
            const falloff = (1 - dist / REPEL_RADIUS) ** 2
            const safeDist = Math.max(dist, 1)
            targetX = (diffX / safeDist) * maxPush * falloff
            targetY = (diffY / safeDist) * maxPush * falloff
          }
        }
        vx[i] += ((targetX - dx[i]) * REPEL_STIFFNESS - vx[i] * REPEL_DAMPING) * dt
        vy[i] += ((targetY - dy[i]) * REPEL_STIFFNESS - vy[i] * REPEL_DAMPING) * dt
        dx[i] += vx[i] * dt
        dy[i] += vy[i] * dt
        maxMovement = Math.max(maxMovement, Math.abs(vx[i]), Math.abs(vy[i]), Math.abs(dx[i]), Math.abs(dy[i]))
      }

      const warped: Point[] = new Array(n)
      for (let i = 0; i < n; i++) {
        warped[i] = [points[i][0] + dx[i], points[i][1] + dy[i]]
      }
      path!.setAttribute('d', buildPathD(warped))

      if (pointer.active || maxMovement > 0.05) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = null
      }
    }

    function handlePointerMove(event: PointerEvent) {
      pointer.clientX = event.clientX
      pointer.clientY = event.clientY
      if (!pointer.active) {
        pointer.active = true
        if (rafId === null) {
          lastTime = performance.now()
          rafId = requestAnimationFrame(tick)
        }
      }
    }

    function handlePointerLeave() {
      pointer.active = false
      // Döngü durmuyor — spring noktaları orijinal konumuna dönene kadar devam eder.
    }

    hero.addEventListener('pointermove', handlePointerMove)
    hero.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', handlePointerLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [enabled, heroRef, svgRef, pathRef, points, maxPush])
}

// Uzun yay: bilinçli olarak asimetrik — tepe noktası merkezden sağa kaymış,
// çıkış (uzun/alçak) ve iniş (kısa/dik) farklı eğrilikte. Mükemmel bir parabol
// hareket hissi vermez. Sol yarıda hep düşük irtifada kalır ki metnin
// üzerine binmesin; yükseliş ancak metin sütununun dışına çıkınca başlar.
const LONG_ARC_POINTS: Point[] = [
  [-140, 740],
  [60, 700],
  [320, 640],
  [500, 480],
  [680, 370],
  [900, 470],
  [1140, 700],
]

function LongArc({ scrollYProgress, shouldReduceMotion, isInView, heroRef, svgRef }: TrajectoryLayerProps) {
  const pathLength = useMotionValue(0)
  const pathRef = useRef<SVGPathElement>(null)
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -30])
  const x = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 15])
  const rotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0.22, 0.22] : [0.22, 0])

  useEffect(() => {
    // Çizim tamamlanınca dasharray tabanlı kısıtlamayı kaldırıyoruz — repel
    // daha sonra d'yi değiştirmeye başladığında tarayıcının pathLength=1
    // için hesapladığı eski ölçek faktörüyle çakışmasın diye (bkz. plan notu).
    if (shouldReduceMotion) {
      pathLength.set(1)
      if (pathRef.current) pathRef.current.style.strokeDasharray = 'none'
      return
    }
    if (!isInView) return
    const controls = animate(pathLength, 1, {
      duration: 1.3,
      delay: 0,
      ease: 'easeOut',
      onComplete: () => {
        if (pathRef.current) pathRef.current.style.strokeDasharray = 'none'
      },
    })
    return controls.stop
  }, [isInView, shouldReduceMotion, pathLength])

  useTrajectoryRepel(pathRef, svgRef, heroRef, LONG_ARC_POINTS, REPEL_MAX_PUSH_LONG_ARC, !shouldReduceMotion)

  return (
    <motion.path
      ref={pathRef}
      d={buildPathD(LONG_ARC_POINTS)}
      fill="none"
      className="stroke-accent-deep"
      strokeWidth={1.5}
      vectorEffect="non-scaling-stroke"
      style={{ x, y, rotate, opacity, pathLength }}
    />
  )
}

// İvme çizgisi: sağ-üst çeyrekte, öne eğilen bir sprint hattı gibi hafif içbükey.
// Tamamen sağ yarıda kalır, metin sütunuyla hiç kesişmez.
const ACCELERATION_LINE_POINTS: Point[] = [
  [600, 980],
  [560, 760],
  [540, 560],
  [680, 430],
  [800, 350],
  [920, 320],
  [1150, 260],
]

function AccelerationLine({ scrollYProgress, shouldReduceMotion, isInView, heroRef, svgRef }: TrajectoryLayerProps) {
  const pathLength = useMotionValue(0)
  const pathRef = useRef<SVGPathElement>(null)
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -45])
  const x = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -10])
  const rotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -2])
  const opacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0.28, 0.28] : [0.28, 0])

  useEffect(() => {
    if (shouldReduceMotion) {
      pathLength.set(1)
      if (pathRef.current) pathRef.current.style.strokeDasharray = 'none'
      return
    }
    if (!isInView) return
    const controls = animate(pathLength, 1, {
      duration: 1.15,
      delay: 0.15,
      ease: 'easeOut',
      onComplete: () => {
        if (pathRef.current) pathRef.current.style.strokeDasharray = 'none'
      },
    })
    return controls.stop
  }, [isInView, shouldReduceMotion, pathLength])

  useTrajectoryRepel(
    pathRef,
    svgRef,
    heroRef,
    ACCELERATION_LINE_POINTS,
    REPEL_MAX_PUSH_ACCELERATION_LINE,
    !shouldReduceMotion,
  )

  return (
    <motion.path
      ref={pathRef}
      d={buildPathD(ACCELERATION_LINE_POINTS)}
      fill="none"
      className="stroke-accent-bright"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      style={{ x, y, rotate, opacity, pathLength }}
    />
  )
}

// Dalga: alt üçte birde düşük genlikli iki tepelik eğri, link/kaydırma
// göstergesi satırının arkasından geçer — zaten dolu olan bant burası.
const WAVE_POINTS: Point[] = [
  [-60, 720],
  [140, 560],
  [300, 860],
  [520, 700],
  [720, 550],
  [860, 830],
  [1060, 680],
]

function Wave({ scrollYProgress, shouldReduceMotion, isInView, heroRef, svgRef }: TrajectoryLayerProps) {
  const pathLength = useMotionValue(0)
  const pathRef = useRef<SVGPathElement>(null)
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -70])
  const x = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -20])
  const rotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 2.5])
  const opacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0.15, 0.15] : [0.15, 0])

  useEffect(() => {
    if (shouldReduceMotion) {
      pathLength.set(1)
      if (pathRef.current) pathRef.current.style.strokeDasharray = 'none'
      return
    }
    if (!isInView) return
    const controls = animate(pathLength, 1, {
      duration: 1.05,
      delay: 0.25,
      ease: 'easeOut',
      onComplete: () => {
        if (pathRef.current) pathRef.current.style.strokeDasharray = 'none'
      },
    })
    return controls.stop
  }, [isInView, shouldReduceMotion, pathLength])

  useTrajectoryRepel(pathRef, svgRef, heroRef, WAVE_POINTS, REPEL_MAX_PUSH_WAVE, !shouldReduceMotion)

  return (
    <motion.path
      ref={pathRef}
      d={buildPathD(WAVE_POINTS)}
      fill="none"
      className="stroke-accent-deep"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      style={{ x, y, rotate, opacity, pathLength }}
    />
  )
}

export default function HeroTrajectories({
  scrollYProgress,
  shouldReduceMotion,
  heroRef,
}: Omit<TrajectoryLayerProps, 'isInView' | 'svgRef'>) {
  // 2. ve 3. katman mobilde hiç mount edilmez — motion value'ları ve scroll
  // dinleyicileri o zaman hiç oluşmaz, telefonda ek yük binmez.
  const isTabletUp = useIsTabletUp()
  const svgRef = useRef<SVGSVGElement>(null)
  // Hero görüş alanına ilk girdiğinde bir kez tetiklenir — projede zaten
  // kanıtlanmış desen (bkz. CountUp.tsx), whileInView prop'u yerine.
  const isInView = useInView(svgRef, { once: true, amount: 0.1 })

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <LongArc
        scrollYProgress={scrollYProgress}
        shouldReduceMotion={shouldReduceMotion}
        isInView={isInView}
        heroRef={heroRef}
        svgRef={svgRef}
      />
      {isTabletUp && (
        <>
          <AccelerationLine
            scrollYProgress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
            isInView={isInView}
            heroRef={heroRef}
            svgRef={svgRef}
          />
          <Wave
            scrollYProgress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
            isInView={isInView}
            heroRef={heroRef}
            svgRef={svgRef}
          />
        </>
      )}
    </svg>
  )
}
