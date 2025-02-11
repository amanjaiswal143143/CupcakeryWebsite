import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UPIPaymentProps {
  amount: number;
  merchantUPI: string;
  orderId: string;
  onPaymentComplete: () => void;
}

export default function UPIPayment({
  amount,
  merchantUPI,
  orderId,
  onPaymentComplete,
}: UPIPaymentProps) {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);

  // Generate UPI payment URL
  const upiUrl = `upi://pay?pa=${merchantUPI}&pn=Bindi's Cupcakery&tn=Order ${orderId}&am=${amount}&cu=INR`;

  const handleVerifyPayment = async () => {
    setIsVerifying(true);
    // In a real app, you would verify the payment with your backend
    // For now, we'll simulate a successful payment
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsVerifying(false);
    onPaymentComplete();
    toast({
      title: "Payment verified",
      description: "Your order has been confirmed.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay with UPI</CardTitle>
        <CardDescription>
          Scan the QR code with any UPI app to pay
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeSVG value={upiUrl} size={200} />
        </div>
        <p className="text-sm text-muted-foreground">
          Amount to pay: ₹{amount}
        </p>
        <div className="space-y-2 w-full">
          <Button
            className="w-full"
            onClick={handleVerifyPayment}
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "I have made the payment"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Open in UPI app
              window.location.href = upiUrl;
            }}
          >
            Open in UPI App
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
