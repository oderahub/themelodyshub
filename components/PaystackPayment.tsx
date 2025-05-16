'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface PaystackPaymentProps {
  email: string
  amount: number
  onSuccess: (reference: any) => void
  onClose: () => void
  firstName: string
  lastName: string
}

function PaystackPayment({
  email,
  amount,
  onSuccess,
  onClose,
  firstName,
  lastName
}: PaystackPaymentProps) {
  const [initializePayment, setInitializePayment] = useState<
    null | ((onSuccess: any, onClose: any) => void)
  >(null)

  useEffect(() => {
    import('react-paystack')
      .then(({ usePaystackPayment }) => {
        const config = {
          reference: new Date().getTime().toString(),
          email: email,
          amount: amount * 100, // Convert to kobo for NGN
          currency: 'NGN',
          publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
          metadata: {
            custom_fields: [
              {
                display_name: 'Customer Name',
                variable_name: 'customer_name',
                value: `${firstName} ${lastName}`
              }
            ]
          }
        }
        setInitializePayment(() => usePaystackPayment(config))
      })
      .catch((error) => {
        console.error('Failed to load Paystack:', error)
      })
  }, [email, amount, firstName, lastName])

  if (!initializePayment) {
    return <Button disabled>Loading Paystack...</Button>
  }

  return (
    <Button
      onClick={() => initializePayment(onSuccess, onClose)}
      className="w-full bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg"
    >
      Pay with Paystack
    </Button>
  )
}

export default PaystackPayment
