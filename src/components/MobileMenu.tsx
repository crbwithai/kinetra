import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useLang } from '../i18n/LangContext'
import LangSwitcher from './LangSwitcher'
import { TEXT_NAV_ITEMS } from './navItems'

export default function MobileMenu({ homeHref }: { homeHref: string }) {
  const { t } = useLang()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  // Esc ile kapanma native <dialog> davranışı — bu, senkronu React state'e taşıyor.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => setOpen(false)
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [])

  // dialog.showModal() zaten arka planla etkileşimi engelliyor, ama iOS Safari'de
  // arka plan kaydırması bazen sızabiliyor — ek güvence.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  // Panel açıkken pencere tablet genişliğine (≥768px) büyütülürse otomatik kapat —
  // bu panel yalnızca mobil için var, masaüstünde asla açık kalmamalı.
  useEffect(() => {
    if (!open) return
    const query = window.matchMedia('(min-width: 48rem)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) dialogRef.current?.close()
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [open])

  function toggle() {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.close()
    } else {
      dialog.showModal()
      setOpen(true)
    }
  }

  function closeMenu() {
    dialogRef.current?.close()
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
        className="rounded-none p-sm outline-none tablet:hidden focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7 H20 M4 12 H20 M4 17 H20" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-0 hidden h-dvh max-h-none w-full max-w-none border-none bg-bg-dark p-lg text-bg-light backdrop:bg-bg-dark/60 open:flex open:flex-col open:items-center open:justify-center open:gap-lg starting:-translate-y-2 starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:translate-y-0 transition-all duration-200"
      >
        <nav className="flex flex-col items-center gap-lg" aria-label={t('nav.mainLabel')}>
          {TEXT_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={`${homeHref}#${item.id}`}
              onClick={closeMenu}
              className="text-heading font-heading uppercase outline-none focus-visible:outline-2 focus-visible:outline-accent-bright focus-visible:outline-offset-4"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <LangSwitcher />
      </dialog>
    </>
  )
}
