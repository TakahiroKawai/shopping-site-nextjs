"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51S5l9RFrsp1n52ggHijrXrjE7G2TXz4W1bjAO837uQlpx3oNFEarFv15O5QmuIoyhCA2SXaa97Ak7f7O7Nndxco300ENC1jNYR");

export default function StripeCheckoutButton() {
  const handleClick = async () => {
    const stripe = await stripePromise;
    const res = await fetch("/api/stripesession", { method: "POST" });
    const data = await res.json();
    if (stripe && data.id) {
      await stripe.redirectToCheckout({ sessionId: data.id });
    }
  };

  return (
    <button onClick={handleClick} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 font-bold">
      Stripeで決済
    </button>
  );
}