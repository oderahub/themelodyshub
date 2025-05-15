import { usePaystackPayment } from 'react-paystack';
import { Button } from "@/components/ui/button";

interface PaystackPaymentProps {
  email: string;
  amount: number;
  onSuccess: (reference: any) => void;
  onClose: () => void;
  firstName: string;
  lastName: string;
}

export function PaystackPayment({ email, amount, onSuccess, onClose, firstName, lastName }: PaystackPaymentProps) {
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount * 100, // Convert to kobo/cents
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: `${firstName} ${lastName}`
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <Button
      onClick={() => initializePayment(onSuccess, onClose)}
      className="w-full bg-gradient-to-r from-[#5c87c7] to-[#6055b0] text-white hover:opacity-90 hover:shadow-lg"
    >
      Pay with Paystack
    </Button>
  );
} 