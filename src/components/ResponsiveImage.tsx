import { useEffect, useState } from 'react'

export interface ResponsiveImageProps {
  /** Temel yol, örn. /products/football/ball.webp — mobile/tablet/desktop/blur varyantları buradan türetilir. */
  src: string
  /** Anlamlı, sözlükten gelen alt metin — bu bileşen kendi dictionary lookup yapmaz, çağıran taraf sağlar. */
  alt: string
  className?: string
}

function variantUrl(src: string, suffix: string) {
  return src.replace(/\.webp$/, `-${suffix}.webp`)
}

const BLUR_FADE_MS = 500

// Önce blur varyantı (24px) gösterilir, gerçek görsel yüklenince üstüne solarak biner.
// Blur katmanı geçiş bitince DOM'dan tamamen kaldırılır — büyük ızgaralarda (20+ kart)
// kullanılmayan katmanlar birikmesin diye.
export default function ResponsiveImage({ src, alt, className }: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [showBlur, setShowBlur] = useState(true)

  useEffect(() => {
    if (!loaded) return
    const timer = setTimeout(() => setShowBlur(false), BLUR_FADE_MS)
    return () => clearTimeout(timer)
  }, [loaded])

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {showBlur && (
        <img
          src={variantUrl(src, 'blur')}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-110 object-cover blur-lg transition-opacity duration-500 motion-reduce:transition-none ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      <img
        src={variantUrl(src, 'mobile')}
        srcSet={`${variantUrl(src, 'mobile')} 480w, ${variantUrl(src, 'tablet')} 800w, ${variantUrl(src, 'desktop')} 1200w`}
        sizes="(min-width: 64rem) 1200px, (min-width: 48rem) 800px, 480px"
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`relative h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
