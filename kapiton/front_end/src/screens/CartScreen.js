import React, { useContext } from "react";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/cartscreen.css";

const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/sofas/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sory, this product is limited");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <div className="cart-section">
      <div className="main-div-cart">
        {cartItems.length === 0 ? (
          <p>
            Cart is empty <Link to="/">Go shopping</Link>
          </p>
        ) : (
          <div className="cart-container-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />

                <div className="content">
                  {item.name}
                  <button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    disabled={item.quantity === item.countInStock}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </button>
                  ${item.price} USD
                  <button onClick={() => removeItemHandler(item)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="subtotal">
          <h3>
            Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
            $ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
          </h3>
          <button type="button" disabled={cartItems.length === 0}>
            Proceed to check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
