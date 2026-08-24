import en from './en.json'
import type { Lang } from './pages'
import tr from './tr.json'

const DICTIONARIES: Record<Lang, unknown> = { tr, en }

export function translate(lang: Lang, key: string): string {
  const parts = key.split('.')
  let node: unknown = DICTIONARIES[lang]

  for (const part of parts) {
    if (typeof node !== 'object' || node === null || !(part in node)) {
      console.warn(`[i18n] eksik anahtar: "${key}" (${lang})`)
      return `[[${key}]]`
    }
    node = (node as Record<string, unknown>)[part]
  }

  if (typeof node !== 'string') {
    console.warn(`[i18n] anahtar bir metin değil: "${key}" (${lang})`)
    return `[[${key}]]`
  }

  return node
}
