import React from "react";

export default function SignupForm({
  fname,
  setFname,
  lname,
  setLname,
  username,
  setUsername,
  password,
  setPassword,
  Register,
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
        Register yourself please!
      </h5>
      <div className="row mb-4">
        <div className="col">
          <input
            onChange={(event) => setFname(event.target.value)}
            value={fname}
            type="text"
            id="fname"
            className="form-control form-control-lg"
          />
          <label className="form-label" htmlFor="fname">
            First Name
          </label>
        </div>
        <div className="col">
          <input
            onChange={(event) => setLname(event.target.value)}
            value={lname}
            type="text"
            id="lname"
            className="form-control form-control-lg"
          />
          <label className="form-label" htmlFor="lname">
            Last Name
          </label>
        </div>
      </div>
      <div className="form-outline mb-4">
        <input
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          type="text"
          id="form2Example17"
          className="form-control form-control-lg"
        />
        <label className="form-label" htmlFor="form2Example17">
          Username{" "}
          <i className="ms-2" style={{ color: "#E41221" }}>
            ( Your Username must be Unique! )
          </i>
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
          onClick={(event) => Register(event)}
          className="btn btn-lg btn-dark btn-block"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
}
