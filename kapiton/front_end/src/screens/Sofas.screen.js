import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Link } from "react-router-dom";
// import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, sofas: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SofasScreen = () => {
  const [{ loading, error, sofas }, dispatch] = useReducer(logger(reducer), {
    sofas: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/sofas");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <main>
        <h1>Sofas</h1>
        <div className="sofas">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            sofas.map((sofa) => (
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
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default SofasScreen;
