import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import ListGroup from 'react-bootstrap/ListGroup'
// import Card from 'react-bootstrap/Card'
import Badge from "react-bootstrap/Badge";
import "../styles/sofainfo.css";
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
      return { ...state, sofa: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Sofa = () => {
  const navigate = useNavigate();
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
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (e) => {
    e.preventDefault();
    const existItem = cart.cartItems.find((x) => x._id === sofa._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/sofas/${sofa._id}`);
    if (data.countInStock < quantity) {
      window.alert("This product is limited");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...sofa, quantity } });
    navigate("/cart");
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="sofa-info-container">
      <div className="sofa-info-img">
        <img className="img-large" src={sofa.image} alt="" />
      </div>

      <div className="sofa-info-description">
        <h1>Sofa {sofa.name}</h1>
        <h3>${sofa.price} USD</h3>
        <Rating rating={sofa.rating} numReviews={sofa.numReviews}></Rating>
        <p>{sofa.description}</p>

        <div className="count-in-stock">
          {sofa.countInStock > 0 ? (
            <Badge className="in-stock" bg="success">
              In stock
            </Badge>
          ) : (
            <Badge className="sold-out" bg="danger">
              Out of stock
            </Badge>
          )}
          {sofa.countInStock > 0 && (
            <a onClick={addToCartHandler} href="/">
              <BsArrowRight className="cart-icon-sofa-info" />
              Add to cart
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sofa;
