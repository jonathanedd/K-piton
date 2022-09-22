import React from "react";
import { Link } from "react-router-dom";
import sofas from "../images/sofas4.jpg";
import dining from "../images/comedores4.jpg";
import chairs from "../images/chairs1.jpg";

import "../styles/homescreen.css";

const HomeScreen = () => {
  return (
    <section className="main-section">
      <header className="header-container"></header>

      <div className="section-items">
        <div className="sofas-items">
          <Link to="/sofas">
            <img src={sofas} alt="" />
          </Link>

          <h1>
            <Link className="link-sofas" to="/sofas">
              Sofas
            </Link>
          </h1>
        </div>

        <div className="dinig-chairs-container">
          <div className="dining-tables">
            <a href="/tables">
              <img src={dining} alt="" />
            </a>
            <h1>
              <Link className="link-tables" to="/tables">
                Dining rooms & tables
              </Link>
            </h1>
          </div>

          <div className="chairs">
            <a href="/chairs">
              <img src={chairs} alt="" />
            </a>
            <h1>
              <Link className="link-chairs" to="/chairs">
                Chairs
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeScreen;
