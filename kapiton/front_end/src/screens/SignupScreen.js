import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/signinscreen.css";
import { Store } from "../Store.js";
import { toast } from "react-toastify";
import { getError } from "../utils";

const SignupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="small-container">
      <h1 className="my-3">Sign up</h1>

      <form className="form-signin" onSubmit={submitHandler}>
        <label>
          Name:
          <input
            placeholder="Name"
            type="name"
            name="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          Confirm password:
          <input
            placeholder="Password"
            type="password"
            name="Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="sign-in" type="submit">
          Sign up
        </button>
        <div className="new-customer">
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupScreen;
