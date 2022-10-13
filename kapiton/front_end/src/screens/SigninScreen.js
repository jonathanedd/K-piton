import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/signinscreen.css";

const SigninScreen = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  return (
    <div className="small-container">
      <h1 className="my-3">Sign in</h1>

      <form>
        <label>
          Email:
          <input placeholder="Email" type="email" name="Email" required />
          Password:
          <input
            placeholder="Password"
            type="password"
            name="Password"
            required
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
