"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

export function StripePaymentClient({
  clientSecret,
  setupFutureUsage = false,
}: {
  clientSecret: string;
  setupFutureUsage?: boolean;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#10b981",
            borderRadius: "6px",
          },
        },
      }}
    >
      <PaymentForm setupFutureUsage={setupFutureUsage} />
    </Elements>
  );
}

function PaymentForm({
  setupFutureUsage = false,
}: {
  setupFutureUsage?: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Impossible de charger Stripe", {
        description: "Veuillez rafraîchir la page et réessayer",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          setup_future_usage: setupFutureUsage ? "off_session" : undefined,
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Une erreur est survenue");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors du paiement", error);
      toast.error("Une erreur est survenue", {
        description: "Veuillez réessayer plus tard",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement />
        {setupFutureUsage && (
          <div className="text-sm text-muted-foreground">
            Votre méthode de paiement sera enregistrée pour les paiements
            futurs.
          </div>
        )}
        <Button
          size="sm"
          type="submit"
          className="w-full"
          disabled={isLoading || !stripe || !elements}
        >
          {isLoading ? "Traitement en cours..." : "Payer"}
        </Button>
      </form>
    </div>
  );
}
