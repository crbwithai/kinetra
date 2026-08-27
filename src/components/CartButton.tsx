import { useLang } from '../i18n/LangContext'
import { useCart } from '../lib/CartContext'

export default function CartButton() {
  const { t } = useLang()
  const { itemCount, open } = useCart()

  return (
    <button
      type="button"
      onClick={open}
      aria-label={t('cart.openCart')}
      className="relative rounded-none p-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-2"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 6 H6 L8.2 16.2 A2 2 0 0 0 10.15 17.8 H17.5 A2 2 0 0 0 19.45 16.35 L21 9 H7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="21" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="18" cy="21" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-bright px-1 text-label leading-none text-bg-dark"
        >
          {itemCount}
        </span>
      )}
    </button>
  )
}
