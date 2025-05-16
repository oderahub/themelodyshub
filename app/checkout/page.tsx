'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, CreditCard, ShieldCheck } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import dynamic from 'next/dynamic'

// Import PaystackPayment component dynamically with SSR disabled
const PaystackPayment = dynamic(() => import('@/components/PaystackPayment'), {
  ssr: false,
  loading: () => <Button disabled>Loading payment system...</Button>
})

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Nigeria', // Default to Nigeria for NGN
    saveInfo: false
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const total = subtotal // No shipping or tax for e-books

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, saveInfo: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'country']

    requiredFields.forEach((field) => {
      if (!formState[field as keyof typeof formState]) {
        errors[field] = 'This field is required'
      }
    })

    // Email validation
    if (formState.email && !/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Phone validation (for Nigerian numbers, 11 digits including leading 0)
    if (formState.phone && !/^\d{11}$/.test(formState.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 11-digit phone number'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderComplete(true)
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
      clearCart()
    }, 1500)
  }

  const handlePaystackSuccess = (reference: any) => {
    setIsSubmitting(true)
    // Verify payment with backend in production
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderComplete(true)
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
      clearCart()
    }, 1500)
  }

  const handlePaystackClose = () => {
    console.log('Payment cancelled')
    setIsSubmitting(false)
  }

  const handlePaystackError = (error: any) => {
    console.error('Payment error:', error)
    setIsSubmitting(false)
    // You might want to show an error message to the user here
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
            <p className="text-gray-600 mb-6">
              Your order number is <span className="font-bold">{orderNumber}</span>
            </p>
            <Alert className="bg-blue-50 border-blue-200 mb-8">
              <AlertDescription>
                A confirmation email has been sent to{' '}
                <span className="font-medium">{formState.email}</span>
              </AlertDescription>
            </Alert>
            <div className="space-y-4">
              <Link href="/">
                <Button className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg px-8 py-6 text-lg">
                  Return to Home
                </Button>
              </Link>
            </div>
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
            <Link href="/cart" className="hover:text-[#5c87c7] transition-colors">
              Cart
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#5c87c7] to-[#6055b0] bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-[#5c87c7]" />
                    Billing Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleInputChange}
                        className={`border-[#92c4e4] focus:border-[#5c87c7] ${
                          formErrors.firstName ? 'border-red-500' : ''
                        }`}
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleInputChange}
                        className={`border-[#92c4e4] focus:border-[#5c87c7] ${
                          formErrors.lastName ? 'border-red-500' : ''
                        }`}
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={`border-[#92c4e4] focus:border-[#5c87c7] ${
                          formErrors.email ? 'border-red-500' : ''
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm">{formErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className={`border-[#92c4e4] focus:border-[#5c87c7] ${
                          formErrors.phone ? 'border-red-500' : ''
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm">{formErrors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formState.country}
                        onValueChange={(value) => handleSelectChange('country', value)}
                      >
                        <SelectTrigger
                          id="country"
                          className={`border-[#92c4e4] focus:border-[#5c87c7] ${
                            formErrors.country ? 'border-red-500' : ''
                          }`}
                        >
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nigeria">Nigeria</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.country && (
                        <p className="text-red-500 text-sm">{formErrors.country}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formState.saveInfo}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="saveInfo"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-[#5c87c7]" />
                    Payment Method
                  </h2>

                  {isClient && (
                    <div className="mt-6">
                      <PaystackPayment
                        email={formState.email}
                        amount={total}
                        onSuccess={handlePaystackSuccess}
                        onClose={handlePaystackClose}
                        onError={handlePaystackError}
                        firstName={formState.firstName}
                        lastName={formState.lastName}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between items-center">
                <Link
                  href="/cart"
                  className="inline-flex items-center text-[#5c87c7] hover:underline"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Return to Cart
                </Link>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg px-8 py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="max-h-80 overflow-y-auto mb-6 pr-2">
                  {items.map((item) => (
                    <div
                      key={item.book.id}
                      className="flex gap-3 mb-4 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="w-16 h-24 relative flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.book.coverImage || '/placeholder.svg'}
                          alt={item.book.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{item.book.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                          <span className="font-medium text-[#6055b0]">
                            ₦{item.book.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#6055b0]">₦{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2 text-[#5c87c7]" />
                    Secure Checkout
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your payment information is processed securely. We do not store credit card
                    details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
