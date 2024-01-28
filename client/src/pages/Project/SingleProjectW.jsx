import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarU from "../../components/NavbarU";
import { BASE_URL } from "../../services/config";
import { projectEndpoints } from "../../services/endpoints/projectEndpoints";
import Spinner from "../../components/Spinner";
import { fetchResponse } from "../../services/service";
import { errorOf, serverDown } from "../../helper/responseMessages";
import Alert from "../../components/Alert";
import ProjectForm from "./Views/ProjectForm";

const SingleProjectW = () => {
  const navigate = useNavigate();

  const id = useParams().id;
  const username = useParams().username;

  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const getProject = async () => {
      try {
        let responseData = await fetchResponse(
          projectEndpoints.getProject(id),
          0,
          null
        );
        if (!responseData.success) {
          setShowingAlert(true);
          setAlertTitle(errorOf(responseData.status));
          setAlertMessage(responseData.message);
        }
        setProject(responseData.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setAlertTitle(errorOf(500));
        setAlertMessage(serverDown);
        setIsLoading(false);
        setShowingAlert(true);
      }
    };
    getProject();
  }, [id]);

  const DeleteProject = () => {
    let views = 0,
      likes = 0;
    var fd = new FormData();
    fd.append("username", username);
    fd.append("likes", likes);
    fd.append("views", views);
    fetch(`${BASE_URL}project-details/${id}`, {
      method: "delete",
    });
    fetch(`${BASE_URL}profile-decrement`, {
      method: "put",
      body: fd,
    }).then((res) => {
      res.json().then((data) => {
        console.log(data, "Update API");
      });
    });
    alert("Successfully deleted!");
    navigate(`/profile/${username}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <NavbarU />
      <section className="gradient-custom-2">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10">
              <div className="card mt-4 mb-4" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-md-block">
                    <img
                      src={`${projectEndpoints.getProjectImage(
                        project._id
                      )}?${Math.random()}`}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5">
                      <ProjectForm
                        project={project}
                        action={DeleteProject}
                        actionTitle={"Delete"}
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

export default SingleProjectW;
