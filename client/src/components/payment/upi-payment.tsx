import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";
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
  const upiUrl =  "upi://pay?pa=9770096693@axl&pn=Aman%20Jaiswal&cu=INR";

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
      <CardContent>
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
              // Open the UPI payment URL in the browser
              window.location.href = "upi://pay?pa=9770096693@axl&pn=Aman%20Jaiswal&cu=INR"
              ;
            }}
          >
            Open in Phone Pay
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Open the UPI payment URL in the browser
              window.location.href = "https://wa.me/9770096693?text=Hello%2C%20I%20want%20to%20order%20a%20cake%21"
              ;
            }}
          >
            GIVE AWAY 
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
