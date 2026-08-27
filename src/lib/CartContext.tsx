import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DeepShowcaseBranchId } from '../data/products'

export interface CartLine {
  branchId: DeepShowcaseBranchId
  productId: string
  quantity: number
}

interface CartContextValue {
  lines: CartLine[]
  itemCount: number
  isOpen: boolean
  open: () => void
  close: () => void
  addItem: (branchId: DeepShowcaseBranchId, productId: string) => void
  increment: (branchId: DeepShowcaseBranchId, productId: string) => void
  decrement: (branchId: DeepShowcaseBranchId, productId: string) => void
  removeItem: (branchId: DeepShowcaseBranchId, productId: string) => void
}

const STORAGE_KEY = 'kinetra-cart'

const CartContext = createContext<CartContextValue | null>(null)

function readStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as CartLine[]) : []
  } catch {
    return []
  }
}

function isSameLine(line: CartLine, branchId: DeepShowcaseBranchId, productId: string): boolean {
  return line.branchId === branchId && line.productId === productId
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStoredLines)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  function addItem(branchId: DeepShowcaseBranchId, productId: string) {
    setLines((prev) => {
      const existing = prev.find((line) => isSameLine(line, branchId, productId))
      if (existing) {
        return prev.map((line) => (isSameLine(line, branchId, productId) ? { ...line, quantity: line.quantity + 1 } : line))
      }
      return [...prev, { branchId, productId, quantity: 1 }]
    })
    setIsOpen(true)
  }

  function increment(branchId: DeepShowcaseBranchId, productId: string) {
    setLines((prev) =>
      prev.map((line) => (isSameLine(line, branchId, productId) ? { ...line, quantity: line.quantity + 1 } : line)),
    )
  }

  function decrement(branchId: DeepShowcaseBranchId, productId: string) {
    setLines((prev) =>
      prev.map((line) =>
        isSameLine(line, branchId, productId) ? { ...line, quantity: Math.max(1, line.quantity - 1) } : line,
      ),
    )
  }

  function removeItem(branchId: DeepShowcaseBranchId, productId: string) {
    setLines((prev) => prev.filter((line) => !isSameLine(line, branchId, productId)))
  }

  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines])

  const value: CartContextValue = {
    lines,
    itemCount,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    addItem,
    increment,
    decrement,
    removeItem,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart(), CartProvider dışında çağrıldı')
  }
  return ctx
}
