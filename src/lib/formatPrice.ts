import type { Lang } from '../i18n/pages'

// CLAUDE.md §8: TR "1.299 ₺" · EN "₺1,299" — Intl binlik ayıracı doğru yerleştirir
// (tr-TR → nokta, en-US → virgül), sembolün konumunu dile göre elle yerleştiriyoruz.
export function formatPrice(amount: number, lang: Lang): string {
  const grouped = new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US').format(amount)
  return lang === 'tr' ? `${grouped} ₺` : `₺${grouped}`
}
