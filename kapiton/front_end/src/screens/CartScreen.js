import React, { useContext } from "react";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import "../styles/cartscreen.css";

const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div className="cart-section">
      <h1>Shopping cart</h1>

      <div>
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
                  <button disabled={item.quantity === 1}>
                    <i className="fas fa-minus-circle"></i>
                  </button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <button>
                    <i className="fas fa-plus-circle"></i>
                  </button>
                  ${item.price} USD
                  <button>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3>
          Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h3>
      </div>
    </div>
  );
};

export default CartScreen;
