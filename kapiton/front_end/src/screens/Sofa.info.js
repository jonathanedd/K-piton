import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import "../styles/sofainfo.css";
import Rating from "../components/rating/Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, sofa: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Sofa = () => {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, sofa }, dispatch] = useReducer(reducer, {
    sofa: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/sofas/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, [slug]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <img className="img-large" src={sofa.image} alt="" />
      <Rating rating={sofa.rating} numReviews={sofa.numReviews}></Rating>
      <h1>{sofa.name}</h1>
      <h3>${sofa.price} USD</h3>
      <p>{sofa.description}</p>
    </div>
  );
};

export default Sofa;
