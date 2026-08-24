export type Lang = 'tr' | 'en'

export const LANGS: readonly Lang[] = ['tr', 'en']

export type PageKey = 'home'

interface PageDef {
  slugs: Record<Lang, string> // '' = dilin kök sayfası (index route)
  titleKey: string
  descriptionKey: string
}

// Tek kaynak: hem router (src/routes/router.tsx) hem dil değiştirici hem de
// hreflang üretimi (src/i18n/useSeo.ts) buradan besleniyor. Yeni sayfa eklemek
// = buraya bir satır + router.tsx'teki bileşen kaydına bir satır eklemek.
export const PAGES: Record<PageKey, PageDef> = {
  home: {
    slugs: { tr: '', en: '' },
    titleKey: 'meta.home.title',
    descriptionKey: 'meta.home.description',
  },
}

export function pagePath(page: PageKey, lang: Lang): string {
  const slug = PAGES[page].slugs[lang]
  return slug ? `/${lang}/${slug}` : `/${lang}`
}

export function matchPage(lang: Lang, restPath: string): PageKey | null {
  for (const key of Object.keys(PAGES) as PageKey[]) {
    if (PAGES[key].slugs[lang] === restPath) return key
  }
  return null
}
