import React from "react";

export default function Welcome({ localUsername, HandleClick }) {
  return (
    <div className="container container-sm mt-5 mb-5 text-center">
      <div className="row">
        <div className="col col-sm-3"></div>
        <div className="col col-sm-6">
          <h6>
            Assalam-u-Alaikum{" "}
            <b style={{ color: "#E41221" }}>{localUsername}</b>!
          </h6>
          <img
            className="img-fluid rounded shadow mb-2"
            src="/images/welcome.jpg"
            alt="welcome"
          />
          <p>
            <i>
              We are delighted to have you among us. On behalf of all the
              members and the management, we would like to extend our warmest
              welcome and good wishes!
            </i>
          </p>
          <p style={{ color: "#E41221", fontWeight: "500" }}>
            Let us
            <button
              onClick={HandleClick}
              className="btn btn-danger ms-2 pt-1"
              type="button"
            >
              <img
                src="/images/white_logo_0.0.png"
                alt="logo"
                width={"70px"}
                height={"18.18px"}
              />
            </button>
          </p>
        </div>
        <div className="col col-sm-3"></div>
      </div>
    </div>
  );
}
