import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../navbar/nav.css";
import Badge from "react-bootstrap/esm/Badge";
import { Store } from "../../Store";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Nav = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div>
      <nav className="nav-container me-auto">
        <div className="nav-logo">
          <Link className="logo" to="/">
            Kápiton
          </Link>
        </div>
        <div className="nav-list">
          <a href="/">Products</a>
          <a href="/">Collections</a>
          <a href="/">Stores</a>
          <a href="/">Contact</a>
          <div className="cart-container">
            <Link to="/cart" className="nav-link">
              <AiOutlineShoppingCart />
              {cart.cartItems.length > 0 && (
                <Badge className="cart-quantity">{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
