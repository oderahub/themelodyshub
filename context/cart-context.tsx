"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Book } from "@/lib/books"

type CartItem = {
  book: Book
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (book: Book, quantity?: number) => void
  removeItem: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Initialize cart from localStorage
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (book: Book, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book.id === book.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...prevItems, { book, quantity }]
    })
  }

  const removeItem = (bookId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.book.id !== bookId))
  }

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(bookId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.book.id === bookId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.book.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
