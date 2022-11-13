import React, { useEffect } from "react";
import CheckOutSteps from "../components/checkout/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";
import "../styles/placeorderscreen.css";
import { BsCheck2, BsPaypal } from "react-icons/bs";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {};

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <div className="global-box">
        <h1>Order preview</h1>

        <div className="main-box-order-screen">
          <div className="shipping-info">
            <h3>Shipping Information:</h3>
            <ul>
              <li>
                <strong>Name:</strong> {cart.shippingAddress.fullName}
              </li>
              <li>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city},{cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </li>{" "}
              <br />
              <button>
                <Link to="/shipping">Edit</Link>
              </button>
            </ul>
          </div>

          <div className="payment-info">
            <h3>Payment info:</h3>
            <ul>
              <li>
                <BsPaypal fontSize="1.8rem" color="darkblue" />{" "}
                {cart.paymentMethod}
              </li>
            </ul>
            <button>
              <Link to="/payment">Edit</Link>
            </button>
          </div>

          <div className="items">
            <h3>Items:</h3>
            {cart.cartItems.map((item) => (
              <ul>
                <img src={item.image} alt={item.name} />
                <li>
                  <Link to={`/product/${item.slug}`}>{item.name}</Link>
                </li>
                <li>
                  <span>{item.quantity}</span>
                </li>
                <li>${item.price} </li>
                <BsCheck2 fontSize="1.8rem" color="green" />
              </ul>
            ))}
            <button>
              <Link to="/cart">Edit</Link>
            </button>
          </div>

          <div className="order-summary">
            <h3>Order summary</h3>
            <ul>
              <li>Items: ${cart.itemsPrice.toFixed(2)}</li>
              <li>Shipping: ${cart.shippingPrice.toFixed(2)}</li>
              <li>Tax: ${cart.taxPrice.toFixed(2)}</li>
              <li>
                <strong>Total: ${cart.totalPrice.toFixed(2)}</strong>
              </li>
            </ul>
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
