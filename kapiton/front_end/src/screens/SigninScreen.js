import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/signinscreen.css";
import { Store } from "../Store.js";
import { toast } from "react-toastify";

const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error("Invalid Credentials");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="small-container">
      <h1 className="my-3">Sign in</h1>

      <form className="form-signin" onSubmit={submitHandler}>
        <label>
          Email:
          <input
            placeholder="Email"
            type="email"
            name="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          Password:
          <input
            placeholder="Password"
            type="password"
            name="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="sign-in" type="submit">
          Sign in
        </button>
        <div className="new-customer">
          New customer ?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
