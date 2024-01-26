import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { userEndpoints } from "../../../services/endpoints/userEndpoints";
import { fetchResponse } from "../../../services/service";
import Spinner from "../../../components/Spinner";
import { errorOf, serverDown } from "../../../helper/responseMessages";
import Alert from "../../../components/Alert";
import LoginForm from "./Views/LoginForm";

const Login = () => {
  localStorage.clear();

  const navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const LoginCheck = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let responseData = await fetchResponse(userEndpoints.loginUser(), 1, {
        username,
        password,
      });
      setAlertTitle(errorOf(responseData.status ?? 400));
      setAlertMessage(responseData.message);
      setIsLoading(false);
      setShowingAlert(true);
      if (responseData.success) {
        localStorage.setItem("hasProfile", responseData.hasProfile)
        if (responseData.hasProfile) navigate(`/profile/${username}`);
        else navigate(`/user-home/${username}`);
      }
    } catch (error) {
      console.log(error);
      setAlertTitle(errorOf(500));
      setAlertMessage(serverDown);
      setIsLoading(false);
      setShowingAlert(true);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <section className="vh-100 gradient-custom-2">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="/images/login.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        objectFit: "fill",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5">
                      <LoginForm
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        LoginCheck={LoginCheck}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Alert
        show={showingAlert}
        setShow={setShowingAlert}
        message={alertMessage}
        title={alertTitle}
      />
    </>
  );
};

export default Login;
