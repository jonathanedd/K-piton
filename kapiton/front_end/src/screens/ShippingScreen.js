import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import { Store } from "../Store";

import "../styles/shippingscreen.css";

export default function ShippingScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAdress },
  } = state;

  const [fullName, setFullName] = useState(shippingAdress || "");
  const [address, setAddress] = useState(shippingAdress || "");
  const [city, setCity] = useState(shippingAdress || "");
  const [postalCode, setPostalCode] = useState(shippingAdress || "");
  const [country, setCountry] = useState(shippingAdress || "");

  //This fixes shipping form into sign in if user is sign out
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="small-container-shipping">
        <h1 className="shipping-title">Shipping address</h1>

        <form className="form-shipping" onSubmit={submitHandler}>
          <label>
            Full name
            <input
              type="name"
              name="full name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            Address
            <input
              type="address"
              name="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            city
            <input
              type="city"
              name="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            Postal Code
            <input
              type="postal code"
              name="Postal code"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            Country
            <input
              type="country"
              name="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>

          <div className="mb-3">
            <Button variant="primary" type="submit">
              continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
