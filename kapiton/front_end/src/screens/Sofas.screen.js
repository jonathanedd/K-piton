import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Link } from "react-router-dom";
// import data from "../data";
import "../styles/sofascreen.css";
import Rating from "../components/rating/Rating";
import { BsArrowRight } from "react-icons/bs";
import LoadingBox from "../components/loading-box/LoadingBox";
import MessageBox from "../components/message_box/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";

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
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const addToCartHandler = async (e) => {
    e.preventDefault();

    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...sofas, quantity: 1 } });
  };

  return (
    <div>
      <main className="main-container">
        <h1>Sofas</h1>
        <div className="sofas">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
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
                  <Rating rating={sofa.rating} numReviews={sofa.numReviews} />
                  <p>
                    <strong>${sofa.price} USD</strong>
                  </p>

                  <Link to={`/sofa/${sofa.slug}`}>
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

export default SofasScreen;
