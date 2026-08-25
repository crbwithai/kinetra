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
