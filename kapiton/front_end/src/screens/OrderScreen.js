import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../components/loading-box/LoadingBox";
import MessageBox from "../components/message_box/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order number: {orderId}</h1>

      <div>
        <h3>Shipping</h3>
        <ul>
          <li>
            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
            <strong>Address: </strong>
            {order.shippingAddress.address},{order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode},{order.shippingAddress.country}
          </li>
        </ul>
      </div>

      <div>
        <h3>Method</h3>
        <ul>
          <li>
            {order.paymentMethod}
            {order.isPaid ? (
              <span>Paid at {order.paidAt}</span>
            ) : (
              <span> Not Paid</span>
            )}
          </li>
        </ul>
      </div>

      <div>
        <h3>Cart items:</h3>
        <ul>
          {order.orderItems.map((item) => (
            <li key={item._id}>
              <img width="200px" src={item.image} alt={item.name} />
              <Link to={`/sofa/${item.slug}`}>{item.name}</Link>
              {item.quantity}${item.price}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Order summary</h3>
        <ul>
          <h4>Items:</h4>
          <li>Price: ${order.itemsPrice}</li>
          <li>Shipping: ${order.shippingPrice}</li>
          <li>Tax: ${order.taxPrice}</li>
          <strong>Total: ${order.totalPrice}</strong>
        </ul>
      </div>
    </div>
  ); 
}
