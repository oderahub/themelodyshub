'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PaystackButton } from 'react-paystack'

interface PaystackPaymentProps {
  email: string
  amount: number
  onSuccess: (reference: any) => void
  onClose: () => void
  onError: (error: any) => void
  firstName: string
  lastName: string
}

function PaystackPayment({
  email,
  amount,
  onSuccess,
  onClose,
  onError,
  firstName,
  lastName
}: PaystackPaymentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPaystack = async () => {
      try {
        await import('react-paystack')
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load payment system. Please try again.')
        console.error('Paystack loading error:', err)
        setIsLoading(false)
      }
    }

    loadPaystack()
  }, [])

  if (error) {
    return (
      <div className="text-red-500 text-sm mb-4">
        {error}
        <Button
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-500 hover:bg-red-600"
        >
          Retry
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return <Button disabled>Loading payment system...</Button>
  }

  const PAYSTACK_PUBLIC_KEY = 'pk_test_c6bc9cdd4fb2bfe05f23aae6367c69f710c7541f'

  const componentProps = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100, // Convert to kobo for NGN
    currency: 'NGN',
    publicKey: PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [
        {
          display_name: 'Customer Name',
          variable_name: 'customer_name',
          value: `${firstName} ${lastName}`
        }
      ]
    },
    text: 'Pay with Paystack',
    className: 'w-full bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg',
    onSuccess: onSuccess,
    onClose: onClose,
    onError: onError
  }

  return <PaystackButton {...componentProps} />
}

// Add TypeScript declaration for the global handler
declare global {
  interface Window {
    handlePaystackPayment?: () => void
  }
}

export default PaystackPayment
