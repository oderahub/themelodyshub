"use client"

import { useState } from "react"
import { ShoppingCart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function CartButton() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    setOpen(false)
    router.push('/checkout')
  }

  const handleViewCart = () => {
    setOpen(false)
    router.push('/cart')
  }

  return (
    <div className="flex items-center gap-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg hover:translate-y-0.5 transition-all duration-300 border-0 z-10 relative">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md flex flex-col bg-background">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <SheetClose asChild>
                  <Button
                    className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.book.id} className="flex gap-4 pb-4 border-b">
                    <div className="w-20 h-28 relative flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.book.coverImage || "/placeholder.svg"}
                        alt={item.book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/books/${item.book.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-medium hover:text-[#5c87c7] transition-colors"
                      >
                        {item.book.title}
                      </Link>
                      <p className="text-[#6055b0] font-bold mt-1">${item.book.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-gray-500 hover:text-red-500"
                          onClick={() => removeItem(item.book.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <SheetFooter className="border-t pt-4 bg-background">
              <div className="w-full space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white py-6"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#5c87c7] text-[#5c87c7] flex items-center justify-center gap-2"
                  onClick={handleViewCart}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Full Cart
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full border-[#5c87c7] text-[#5c87c7]">
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
      {itemCount > 0 && (
        <Button
          variant="outline"
          className="border-[#5c87c7] text-[#5c87c7] hover:bg-[#5c87c7]/10 flex items-center gap-2"
          onClick={handleViewCart}
        >
          <ExternalLink className="h-4 w-4" />
          View Cart
        </Button>
      )}
    </div>
  )
}
