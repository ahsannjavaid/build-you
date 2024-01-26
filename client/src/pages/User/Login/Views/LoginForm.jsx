import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  LoginCheck,
}) {
  return (
    <form>
      <div className="d-flex align-items-center pb-1">
        <img
          src="/images/logo0.0.png"
          alt="logo"
          width={"100px"}
          height={"26px"}
        />
      </div>
      <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: 1 }}>
        Sign into your account
      </h5>
      <div className="form-outline mb-4">
        <input
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          type="text"
          id="form2Example17"
          className="form-control form-control-lg"
        />
        <label className="form-label" htmlFor="form2Example17">
          Username
        </label>
      </div>
      <div className="form-outline mb-4">
        <input
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
          id="form2Example27"
          className="form-control form-control-lg"
        />
        <label className="form-label" htmlFor="form2Example27">
          Password
        </label>
      </div>
      <div className="pt-1 mb-4">
        <button
          onClick={(event) => LoginCheck(event)}
          className="btn btn-lg btn-dark btn-block"
          type="submit"
        >
          Login
        </button>
      </div>
      <p style={{ color: "#000" }}>
        Don't have an account?{" "}
        <Link to={"/signup"} style={{ color: "#E41221" }}>
          Register here
        </Link>
      </p>
    </form>
  );
}
