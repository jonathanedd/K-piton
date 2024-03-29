import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import logger from "use-reducer-logger";
import LoadingBox from "../components/loading-box/LoadingBox";
import MessageBox from "../components/message_box/MessageBox";

import { getError } from "../utils";
import Rating from "../components/rating/Rating";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import "../styles/chairscreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, chairs: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ChairScreen = () => {
  const [{ loading, error, chairs }, dispatch] = useReducer(logger(reducer), {
    chairs: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/chairs");
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
        <Link to="/tables">
          <BsArrowLeft className="back-icon-chairs" />
        </Link>
        <h2 className="chairs-title">Chairs</h2>
        <Link to="/sofas">
          <BsArrowRight className="front-icon-sofas" />
        </Link>

        <div className="chairs">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            chairs.map((chair) => (
              <div className="chair" key={chair.slug}>
                <Link to={`/chair/${chair.slug}`}>
                  <img src={chair.image} alt="" />
                </Link>
                <div className="chair-info">
                  <Link to={`/chair/${chair.slug}`}>
                    <h5>{chair.name}</h5>
                  </Link>
                  <Rating rating={chair.rating} numReviews={chair.numReviews} />
                  <p>
                    <strong>${chair.price} USD</strong>
                  </p>

                  <Link to={`/chair/${chair.slug}`}>
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

export default ChairScreen;
