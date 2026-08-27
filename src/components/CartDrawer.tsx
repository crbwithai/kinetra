import { useEffect, useRef } from 'react'
import { findShowcaseProduct } from '../data/products'
import { useLang } from '../i18n/LangContext'
import { formatPrice } from '../lib/formatPrice'
import { useCart } from '../lib/CartContext'

export default function CartDrawer() {
  const { lang, t } = useLang()
  const { lines, isOpen, close, increment, decrement, removeItem } = useCart()
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Context durumunu (isOpen) native <dialog> API'sine yansıtıyor — MobileMenu'deki
  // aynı senkronizasyon deseni.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Esc ile kapanma native <dialog> davranışı — bu, senkronu context state'e taşıyor.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => close()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [close])

  // dialog.showModal() zaten arka planla etkileşimi engelliyor, ama iOS Safari'de
  // arka plan kaydırması bazen sızabiliyor — ek güvence.
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  const total = lines.reduce((sum, line) => {
    const product = findShowcaseProduct(line.branchId, line.productId)
    if (!product) return sum
    const unit = product.price.discountedAmount ?? product.price.amount
    return sum + unit * line.quantity
  }, 0)

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-dvh w-screen border-none bg-transparent p-0 backdrop:bg-bg-dark/60 open:flex"
    >
      <div className="ml-auto flex h-full w-[min(400px,100vw)] flex-col bg-bg-light p-lg text-bg-dark starting:translate-x-full transition-transform duration-300 motion-reduce:transition-none">
        <div className="flex items-center justify-between">
          <p className="text-heading font-heading">{t('nav.sepet')}</p>
          <button
            type="button"
            onClick={close}
            aria-label={t('cart.close')}
            className="rounded-none p-sm text-heading font-heading outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-2"
          >
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="mt-lg text-body font-body text-text-muted-light">{t('cart.empty')}</p>
        ) : (
          <>
            <ul className="mt-lg flex min-h-0 flex-1 flex-col gap-md overflow-y-auto">
              {lines.map((line) => {
                const product = findShowcaseProduct(line.branchId, line.productId)
                if (!product) return null
                return (
                  <li key={`${line.branchId}:${line.productId}`} className="flex items-center justify-between gap-sm">
                    <div>
                      <p className="text-body font-body">{t(product.nameKey)}</p>
                      <p className="text-label text-text-muted-light">
                        {formatPrice(product.price.discountedAmount ?? product.price.amount, lang)}
                      </p>
                    </div>
                    <div className="flex items-center gap-xs">
                      <button
                        type="button"
                        aria-label={t('cart.decrease')}
                        onClick={() => decrement(line.branchId, line.productId)}
                        className="rounded-none p-xs outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-2"
                      >
                        −
                      </button>
                      <span className="text-body font-body">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label={t('cart.increase')}
                        onClick={() => increment(line.branchId, line.productId)}
                        className="rounded-none p-xs outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-2"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        aria-label={t('cart.remove')}
                        onClick={() => removeItem(line.branchId, line.productId)}
                        className="rounded-none p-xs text-text-muted-light outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-2"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mt-lg border-t border-text-muted-light/20 pt-sm text-body font-body">
              {t('cart.total')}: {formatPrice(total, lang)}
            </p>
          </>
        )}
      </div>
    </dialog>
  )
}
