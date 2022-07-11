import React from "react";
import "../footer/footer.css";

const Footer = () => {
  return (
    <div className="footer-main-container">
      <footer className="footer-container">
        <div className="subscribe-box">
          <h3>Subscribe to our email list and receive our latest trends</h3>
          <form action="Email">
            <input type="email" name="Email" placeholder="Email address" />
          </form>
          <h5>Whatsapp: +57 3172899381</h5>
        </div>

        <div className="link-list">
          <li>
            <a href="/">Who we are</a>
          </li>
          <li>
            <a href="/">Designers</a>
          </li>
          <li>
            <a href="/">Catalog</a>
          </li>
          <li>
            <a href="/">Products</a>
          </li>
          <li>
            <a href="/">Shipping</a>
          </li>
          <li>
            <a href="/">Franchise</a>
          </li>
          <li>
            <a href="/">Online advisory</a>
          </li>
          <li>
            <a href="/">Materials</a>
          </li>
          <li>
            <a href="/">Warranty Policy</a>
          </li>
          <li>
            <a href="/">Contact us</a>
          </li>
          <li>
            <a href="/">Terms and conditions</a>
          </li>
          <li>
            <a href="/">Privacy policy</a>
          </li>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
