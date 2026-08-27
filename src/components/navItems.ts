export interface NavItem {
  id: string
  labelKey: string
}

// Header, MobileMenu ve Footer'ın tek ortak kaynağı — üç yerde ayrı ayrı yazılmaz.
export const NAV_ITEMS: NavItem[] = [
  { id: 'branslar', labelKey: 'nav.branslar' },
  { id: 'vitrin', labelKey: 'nav.vitrin' },
  { id: 'teknoloji', labelKey: 'nav.teknoloji' },
  { id: 'hakkinda', labelKey: 'nav.hakkinda' },
  { id: 'sepet', labelKey: 'nav.sepet' },
]

// Sepet artık bir sayfa bölümü değil, drawer — çapa linki yerine Header'daki
// her zaman görünür ikon+rozet düğmesi kullanılıyor. Metin nav listelerinde
// (Header masaüstü, MobileMenu) bu yüzden 'sepet' çıkarılıyor.
export const TEXT_NAV_ITEMS = NAV_ITEMS.filter((item) => item.id !== 'sepet')
