import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../navbar/nav.css";
import Badge from "react-bootstrap/esm/Badge";
import { Store } from "../../Store";
import { AiOutlineShoppingCart, AiOutlineCaretDown } from "react-icons/ai";

// import { Button } from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import DropCollections from "../dropdown/DropCollections";
import DropStores from "../dropdown/DropStores";

const Nav = () => {
  const [click, setClick] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const [dropColl, setDropColl] = useState(false);
  const [dropStores, setDropStores] = useState(false);

  const { state } = useContext(Store);
  const { cart } = state;

  const handleClick = () => {
    setClick(!click);
  };

  // const closeMenu = () => {
  //   setClick(false);
  // };

  //PRODUCTS
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

  //COLLECTIONS

  const onMouseColl = () => {
    if (window.innerWidth < 960) {
      setDropColl(false);
    } else {
      setDropColl(true);
    }
  };

  const onMouseLeaveColl = () => {
    if (window.innerWidth < 960) {
      setDropColl(false);
    } else {
      setDropColl(false);
    }
  };

  //STORES
  const onMouseStores = () => {
    if (window.innerWidth < 960) {
      setDropStores(false);
    } else {
      setDropStores(true);
    }
  };

  const onMouseLeaveStores = () => {
    if (window.innerWidth < 960) {
      setDropStores(false);
    } else {
      setDropStores(false);
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
              {/* <Link to="/" classname="nav-links" onClick={closeMenu}> */}
              Products <AiOutlineCaretDown />
              {dropDown && <Dropdown />}
              {/* </Link> */}
            </li>
          </ul>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li
              className="nav-item"
              onMouseEnter={onMouseColl}
              onMouseLeave={onMouseLeaveColl}
            >
              Collections <AiOutlineCaretDown />
              {dropColl && <DropCollections />}
            </li>
          </ul>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li
              className="nav-item"
              onMouseEnter={onMouseStores}
              onMouseLeave={onMouseLeaveStores}
            >
              Stores <AiOutlineCaretDown />
              {dropStores && <DropStores />}
            </li>
          </ul>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">Contact</li>
          </ul>

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
