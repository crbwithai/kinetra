export type LogoVariant = 'mark' | 'full' | 'wordmark'

export interface LogoProps {
  variant?: LogoVariant
  size?: number
  decorative?: boolean
  title?: string
  className?: string
}

// Shared grid: every glyph (monogram + letters) is authored at this cap-height,
// so alignment across variants is guaranteed by the numbers, not by eye.
const CAP = 100
const LETTER_GAP = 16
const MARK_MARGIN = 16

// "full" lockup: monogram, tek bir harf gibi okunmasın diye büyür ve yazıdan
// ince bir ayraçla ayrılır (bkz. FULL_MARK_TRANSFORM, FULL_TEXT_LAYOUT altında).
const FULL_MARK_SCALE = 1.4
const FULL_GAP = 38 // monogram–ayraç ve ayraç–yazı arası, her biri (toplamda MONOGRAM genişliğinin yarısından fazla)
const DIVIDER_WIDTH = 4

// Kollar tek bir parçadan aynalanır (gövde ekseni y=50'de yansıtılır), böylece
// kalınlık, uzunluk ve uç kesim açısı iki kolda da bire bir eşit kalır.
const MONOGRAM_D =
  'M0,0 L28,0 L28,100 L0,100 Z ' +
  'M24,24 L24,50 L92,23 L105,-8 Z ' +
  'M24,76 L24,50 L92,77 L105,108 Z'
const MONOGRAM_MIN_Y = -8
const MONOGRAM_WIDTH = 105
const MONOGRAM_HEIGHT = 116

interface Glyph {
  char: string
  width: number
  d: string
}

const GLYPH_K: Glyph = {
  char: 'K',
  width: 87,
  // Monogramla aynı kol açısı/kesim mantığı, taşmasız (0-100 içinde kalır).
  d:
    'M0,0 L28,0 L28,100 L0,100 Z ' +
    'M24,24 L24,50 L74,31 L87,0 Z ' +
    'M24,76 L24,50 L74,69 L87,100 Z',
}
const GLYPH_I: Glyph = {
  char: 'I',
  width: 28,
  d: 'M0,0 L28,0 L28,100 L0,100 Z',
}
const GLYPH_N: Glyph = {
  char: 'N',
  width: 78,
  d:
    'M0,0 L28,0 L28,100 L0,100 Z ' +
    'M50,0 L78,0 L78,100 L50,100 Z ' +
    'M0,0 L28,0 L78,100 L50,100 Z',
}
const GLYPH_E: Glyph = {
  char: 'E',
  width: 64,
  d:
    'M0,0 L28,0 L28,100 L0,100 Z ' +
    'M0,0 L64,0 L64,28 L0,28 Z ' +
    'M0,36 L52,36 L52,64 L0,64 Z ' +
    'M0,72 L64,72 L64,100 L0,100 Z',
}
const GLYPH_T: Glyph = {
  char: 'T',
  width: 78,
  d: 'M0,0 L78,0 L78,28 L0,28 Z M25,0 L53,0 L53,100 L25,100 Z',
}
const GLYPH_R: Glyph = {
  char: 'R',
  width: 72,
  d:
    'M0,0 L28,0 L28,100 L0,100 Z ' +
    'M0,0 L72,0 L72,28 L0,28 Z ' +
    'M44,0 L72,0 L72,66 L44,66 Z ' +
    'M0,38 L72,38 L72,66 L0,66 Z ' +
    'M20,58 L48,58 L72,100 L44,100 Z',
}
const GLYPH_A: Glyph = {
  char: 'A',
  width: 84,
  d:
    'M0,100 L28,100 L56,0 L28,0 Z ' +
    'M56,100 L84,100 L56,0 L28,0 Z ' +
    'M32,68 L52,68 L52,84 L32,84 Z',
}

const WORD: Glyph[] = [GLYPH_K, GLYPH_I, GLYPH_N, GLYPH_E, GLYPH_T, GLYPH_R, GLYPH_A]

interface PlacedGlyph extends Glyph {
  x: number
}

function layoutGlyphs(glyphs: Glyph[], gap: number, startX = 0) {
  let x = startX
  const placed: PlacedGlyph[] = []
  for (const glyph of glyphs) {
    placed.push({ ...glyph, x })
    x += glyph.width + gap
  }
  return { placed, totalWidth: x - gap }
}

const WORDMARK_LAYOUT = layoutGlyphs(WORD, LETTER_GAP)

// Monogram, tabanı (gövdenin alt kenarı) yazının taban çizgisiyle çakışacak şekilde
// büyütülür: y=CAP pivot alınarak ölçeklenir, böylece taban sabit kalır ve monogram
// yalnızca yukarı/dışa doğru büyür — "optik olarak aynı hizada" oturmasını sağlayan bu.
const FULL_MARK_TRANSFORM = `translate(0 ${CAP - FULL_MARK_SCALE * CAP}) scale(${FULL_MARK_SCALE})`
const FULL_MONOGRAM_WIDTH = MONOGRAM_WIDTH * FULL_MARK_SCALE
const FULL_MONOGRAM_MIN_Y = MONOGRAM_MIN_Y * FULL_MARK_SCALE + (CAP - FULL_MARK_SCALE * CAP)
const FULL_MONOGRAM_MAX_Y = (MONOGRAM_MIN_Y + MONOGRAM_HEIGHT) * FULL_MARK_SCALE + (CAP - FULL_MARK_SCALE * CAP)

const FULL_DIVIDER_X = FULL_MONOGRAM_WIDTH + FULL_GAP
const FULL_TEXT_START_X = FULL_DIVIDER_X + DIVIDER_WIDTH + FULL_GAP
const FULL_TEXT_LAYOUT = layoutGlyphs(WORD, LETTER_GAP, FULL_TEXT_START_X)

const FULL_MIN_Y = Math.min(FULL_MONOGRAM_MIN_Y, 0)
const FULL_MAX_Y = Math.max(FULL_MONOGRAM_MAX_Y, CAP)

const MARK_BOX = Math.max(MONOGRAM_WIDTH, MONOGRAM_HEIGHT) + MARK_MARGIN * 2
const MARK_OFFSET_X = (MARK_BOX - MONOGRAM_WIDTH) / 2
const MARK_OFFSET_Y = (MARK_BOX - MONOGRAM_HEIGHT) / 2 - MONOGRAM_MIN_Y

interface VariantGeometry {
  viewBoxMinY: number
  viewBoxWidth: number
  viewBoxHeight: number
}

const VARIANT_GEOMETRY: Record<LogoVariant, VariantGeometry> = {
  mark: { viewBoxMinY: 0, viewBoxWidth: MARK_BOX, viewBoxHeight: MARK_BOX },
  wordmark: { viewBoxMinY: 0, viewBoxWidth: WORDMARK_LAYOUT.totalWidth, viewBoxHeight: CAP },
  full: { viewBoxMinY: FULL_MIN_Y, viewBoxWidth: FULL_TEXT_LAYOUT.totalWidth, viewBoxHeight: FULL_MAX_Y - FULL_MIN_Y },
}

export function Logo({
  variant = 'full',
  size = 40,
  decorative = false,
  title = 'KINETRA',
  className,
}: LogoProps) {
  const { viewBoxMinY, viewBoxWidth, viewBoxHeight } = VARIANT_GEOMETRY[variant]
  const width = size * (viewBoxWidth / viewBoxHeight)
  const textLayout = variant === 'full' ? FULL_TEXT_LAYOUT : WORDMARK_LAYOUT

  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`}
      fill="currentColor"
      focusable="false"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      className={className}
    >
      {!decorative && <title>{title}</title>}
      {variant !== 'wordmark' && (
        <path
          d={MONOGRAM_D}
          transform={
            variant === 'mark'
              ? `translate(${MARK_OFFSET_X} ${MARK_OFFSET_Y})`
              : FULL_MARK_TRANSFORM
          }
        />
      )}
      {variant === 'full' && <rect x={FULL_DIVIDER_X} y={0} width={DIVIDER_WIDTH} height={CAP} />}
      {variant !== 'mark' &&
        textLayout.placed.map((glyph) => (
          <path key={glyph.char} d={glyph.d} transform={`translate(${glyph.x} 0)`} />
        ))}
    </svg>
  )
}
