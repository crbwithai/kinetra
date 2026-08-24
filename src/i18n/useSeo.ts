import { useEffect } from 'react'
import { useLang } from './LangContext'
import { LANGS, PAGES, pagePath } from './pages'
import type { PageKey } from './pages'

function setMetaDescription(content: string) {
  let el = document.querySelector('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'description')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// html lang, <title>, meta description ve hreflang linklerini tek yerden yönetir.
// react-helmet gibi harici bir kütüphane gerektirmeyecek kadar küçük bir iş.
export function useSeo(page: PageKey) {
  const { lang, t } = useLang()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t(PAGES[page].titleKey)
    setMetaDescription(t(PAGES[page].descriptionKey))

    document.querySelectorAll('link[data-i18n-hreflang]').forEach((el) => el.remove())

    const entries: Array<{ hreflang: string; href: string }> = LANGS.map((l) => ({
      hreflang: l,
      href: window.location.origin + pagePath(page, l),
    }))
    entries.push({ hreflang: 'x-default', href: window.location.origin + pagePath(page, 'tr') })

    for (const { hreflang, href } of entries) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = href
      link.setAttribute('data-i18n-hreflang', '')
      document.head.appendChild(link)
    }
  }, [lang, page, t])
}
