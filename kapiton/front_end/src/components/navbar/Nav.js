import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../navbar/nav.css";
import Badge from "react-bootstrap/esm/Badge";
import { Store } from "../../Store";
import { AiOutlineShoppingCart, AiOutlineCaretDown } from "react-icons/ai";

// import { Button } from "../button/Button";
import Dropdown from "../dropdown/Dropdown";

const Nav = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { state } = useContext(Store);
  const { cart } = state;

  const handleClick = () => {
    setClick(!click);
  };

  const closeMenu = () => {
    setClick(false);
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="nav-container me-auto">
        <Link className="logo" to="/">
          Kapitoné
        </Link>

        <div className="nav-list" onClick={handleClick}>
          {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link to="/" classname="nav-links" onClick={closeMenu}>
                Products <AiOutlineCaretDown />
                {dropdown && <Dropdown />}
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
