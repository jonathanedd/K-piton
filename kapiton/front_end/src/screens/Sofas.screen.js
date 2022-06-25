import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

const SofasScreen = () => {
  return (
    <div>
      <main>
        <h1>Sofas</h1>
        <div className="sofas">
          {data.sofas.map((sofa) => (
            <div className="sofa" key={sofa.slug}>
              <Link to={`/sofa/${sofa.slug}`}>
                <img src={sofa.image} alt="" />
              </Link>
              <div className="sofa-info">
                <Link to={`/sofa/${sofa.slug}`}>
                  <h5>{sofa.name}</h5>
                </Link>
                <p>
                  <strong>${sofa.price} USD</strong>
                </p>
                {/* <p>{sofa.brief}</p> */}
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SofasScreen;
