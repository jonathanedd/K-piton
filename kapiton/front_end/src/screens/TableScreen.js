import axios from "axios";
import React, { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import { getError } from "../utils";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

import LoadingBox from "../components/loading-box/LoadingBox";
import MessageBox from "../components/message_box/MessageBox";
import Rating from "../components/rating/Rating";

import "../styles/tableScreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, tables: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const TableScreen = () => {
  const [{ loading, error, tables }, dispatch] = useReducer(logger(reducer), {
    tables: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/tables");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <main classname="main-container">
        <Link to="/">
          <BsArrowLeft className="back-icon-tables" />
        </Link>

        <h2 className="tables-title">Dining tables</h2>
        <div className="tables">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            tables.map((table) => (
              <div className="table" key={table.slug}>
                <Link to={`/table/${table.slug}`}>
                  <img src={table.image} alt="" />
                </Link>
                <div className="table-info">
                  <Link to={`/table/${table.slug}`}>
                    <h5>{table.name}</h5>
                  </Link>
                  <Rating rating={table.rating} numReviews={table.numReviews} />
                  <p>
                    <strong>${table.price} USD</strong>
                  </p>

                  <Link to={`/table/${table.slug}`}>
                    <BsArrowRight className="cart-icon" /> See more
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TableScreen;
