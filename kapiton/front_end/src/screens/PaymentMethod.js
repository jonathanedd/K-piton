import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import { Store } from "../Store";

export default function PaymentMethod() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "paypal"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Payment method</h1>
        <form className="payment-form" onSubmit={submitHandler}>
          <div>
            <input
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === "Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </div>

          <div>
            <input
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit / debit card
          </div>

          <div>
            <button className="mb-3" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
