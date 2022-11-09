import React from "react";
import CheckoutSteps from "../components/checkout/CheckoutSteps";

export default function PaymentMethod() {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Payment method</h1>
        <form onSubmit={submitHandler}>
          <input
            type="radio"
            id="Paypal"
            label="Paypal"
            value="Paypal"
            checked={paymentMethodName === "Paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <input
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <button className="mb-3" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
