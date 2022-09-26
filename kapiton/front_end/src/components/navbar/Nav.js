import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../navbar/nav.css";
import Badge from "react-bootstrap/esm/Badge";
import { Store } from "../../Store";
import { AiOutlineShoppingCart, AiOutlineCaretDown } from "react-icons/ai";

import { Button } from "../button/Button";
import Dropdown from "../dropdown/Dropdown";

const Nav = () => {
  const [open, setIsOpen] = useState(false);

  const { state } = useContext(Store);
  const { cart } = state;

  const dropdown = () => {
    setIsOpen(!open);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="nav-container me-auto">
        <Link className="logo" to="/">
          Kapitoné
        </Link>

        <div className="nav-list" onClick={dropdown}>
          <i className={open ? "fas fa-times" : "fas fa-bars"}></i>

          <ul className={open ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/Sofas" classname="nav-links" onClick={closeMenu}>
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/Chairs" classname="nav-links" onClick={closeMenu}>
                Collections <AiOutlineCaretDown/>
              </Link>
            </li>
          </ul>

          <a href="/">Collections</a>
          <a href="/">Stores</a>
          <a href="/">Contact</a>
          <div className="cart-container">
            <Link to="/cart" className="nav-link">
              <AiOutlineShoppingCart />
              {cart.cartItems.length > 0 && (
                <Badge className="cart-quantity">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
