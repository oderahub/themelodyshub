"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BookOpen, ChevronLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState(false)

  const shipping = 4.99
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "books10") {
      setCouponApplied(true)
      setCouponError(false)
    } else {
      setCouponApplied(false)
      setCouponError(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any books to your cart yet.</p>
            <Link href="/#books">
              <Button className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg px-8 py-6 text-lg">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#5c87c7] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
          Your Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Cart Items <span className="text-gray-500">({itemCount})</span>
                  </h2>
                  <Button variant="ghost" className="text-red-500 hover:text-red-700" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.book.id} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
                      <div className="w-24 h-36 relative flex-shrink-0 overflow-hidden rounded-md">
                        <Link href={`/books/${item.book.slug}`}>
                          <Image
                            src={item.book.coverImage || "/placeholder.svg"}
                            alt={item.book.title}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <Link
                              href={`/books/${item.book.slug}`}
                              className="font-medium text-lg hover:text-[#5c87c7] transition-colors"
                            >
                              {item.book.title}
                            </Link>
                            <p className="text-gray-500 text-sm">by {item.book.author}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                            onClick={() => removeItem(item.book.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>

                        <div className="mt-2 flex items-center">
                          <Badge className={`${item.book.badgeColor} text-white`}>{item.book.badge}</Badge>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none border-r"
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none border-l"
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-[#6055b0]">${item.book.price.toFixed(2)}</p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                ${item.book.price.toFixed(2)} × {item.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Link href="/#books" className="inline-flex items-center text-[#5c87c7] hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </Link>
              <Link href="/checkout">
                <Button className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#6055b0]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Apply Coupon Code</p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border-[#92c4e4] focus:border-[#5c87c7]"
                      />
                      <Button variant="outline" className="border-[#5c87c7] text-[#5c87c7]" onClick={handleApplyCoupon}>
                        Apply
                      </Button>
                    </div>
                    {couponApplied && <p className="text-sm text-green-600 mt-1">Coupon applied successfully!</p>}
                    {couponError && <p className="text-sm text-red-500 mt-1">Invalid coupon code</p>}
                    <p className="text-xs text-gray-500 mt-2">Try "BOOKS10" for 10% off your order</p>
                  </div>

                  <Link href="/checkout" className="block w-full">
                    <Button className="w-full bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg py-6">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-[#5c87c7]" />
                      Satisfaction Guaranteed
                    </h3>
                    <p className="text-sm text-gray-600">
                      Not satisfied with your purchase? We offer a 30-day money-back guarantee on all our books.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
