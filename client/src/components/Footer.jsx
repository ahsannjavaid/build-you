import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const NavToSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <section>
        <footer
          className="text-center text-white"
          style={{ backgroundColor: "#383838" }}
        >
          <div className="container p-4 pb-0">
            <section>
              <div>
                <Link to={"/"}>
                  <img
                    src="/images/white_logo_0.0.png"
                    alt="logo"
                    width={"250px"}
                    height={"65px"}
                  />
                </Link>
                <p className="mt-2 fw-light">
                  A PORTFOLIO SITE BY{" "}
                  <a
                    href="https://behance.net/ahsannjavaid"
                    style={{ color: "white" }}
                  >
                    AHSAN JAVED
                  </a>
                </p>
              </div>
              <p className="d-flex justify-content-center align-items-center mt-4">
                <span className="me-3">Register for free</span>
                <button
                  onClick={NavToSignup}
                  type="button"
                  className="btn btn-outline-light btn-rounded"
                >
                  Sign up!
                </button>
              </p>
            </section>
          </div>
          <div
            className="text-center p-3 fs-6"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2022 - Another Project:
            <a
              className="text-white ms-2"
              href="https://un-portalbyahsanjaved.netlify.app/#/"
            >
              UN Portal
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Footer;
