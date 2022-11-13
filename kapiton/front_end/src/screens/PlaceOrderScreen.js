import React, { useEffect } from "react";
import CheckOutSteps from "../components/checkout/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";

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
    <div>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <h1>Preview order</h1>

      <div>
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

      <div>
        <h3>Payment info:</h3>
        <ul>
          <li>{cart.paymentMethod}</li>
        </ul>
        <button>
          <Link to="/payment">Edit</Link>
        </button>
      </div>

      <div>
        <h3>Items:</h3>
        {cart.cartItems.map((item) => (
          <ul>
            <li>
              <img width="200px" src={item.image} alt={item.name} />
            </li>
            <li>
              <Link to={`/product/${item.slug}`}>{item.name}</Link>
            </li>
            <li>
              <span>{item.quantity}</span>
            </li>
            <li>${item.price}</li>
          </ul>
        ))}
        <button>
          <Link to="/cart">Edit</Link>
        </button>
      </div>

      <div>
        <h3>Order summary</h3>
        <ul>
          <li>Items: ${cart.itemsPrice.toFixed(2)}</li>
          <li>Shipping: ${cart.shippingPrice.toFixed(2)}</li>
          <li>Tax: ${cart.taxPrice.toFixed(2)}</li>
          <li>
            <strong>${cart.totalPrice.toFixed(2)}</strong>
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
  );
}
