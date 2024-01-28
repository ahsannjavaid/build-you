import React from "react";
import { Link, useParams } from "react-router-dom";

const NavbarU = () => {
  const localUsername = useParams().username;
  const hasProfile = localStorage.getItem("hasProfile");

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <Link to={"/"}>
            <img
              src="/images/logo0.0.png"
              alt="logo"
              height="26px"
              width="100px"
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link
                className="nav-item nav-link"
                to={
                  parseInt(hasProfile)
                    ? `/profile/${localUsername}`
                    : `/user-home/${localUsername}`
                }
              >
                PROFILE
              </Link>
              <Link
                className="nav-item nav-link"
                to={`/post-project/${localUsername}`}
              >
                POST PROJECT
              </Link>
              <Link className="nav-item nav-link" to={"/login"}>
                LOGOUT
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarU;
