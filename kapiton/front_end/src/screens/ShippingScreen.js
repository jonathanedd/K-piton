import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../styles/shippingscreen.css";

export default function ShippingScreen() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="small-container-shipping">
      <h1 className="shipping-title">Shipping address</h1>

      <form className='form-shipping' onSubmit={submitHandler}>
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

      <Form onSubmit={submitHandler}></Form>
    </div>
  );
}
