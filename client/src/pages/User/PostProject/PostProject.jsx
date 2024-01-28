import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarU from "../../../components/NavbarU";
import PostProjectForm from "./Views/PostProjectForm";
import { fetchResponse } from "../../../services/service";
import { projectEndpoints } from "../../../services/endpoints/projectEndpoints";
import Spinner from "../../../components/Spinner";
import { errorOf, serverDown, successOf } from "../../../helper/responseMessages";
import Alert from "../../../components/Alert";

const PostProject = () => {
  const navigate = useNavigate();

  const username = useParams().username;

  let [projectName, setProjectName] = useState("");
  let [projectImage, setProjectImage] = useState("");
  let [projectDescription, setProjectDescription] = useState("");
  let [projectTool, setProjectTool] = useState("");
  let [projectLink, setProjectLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    setProjectImage(e.target.files[0]);
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const PostProject = async (event) => {
    var fd = new FormData();
    fd.append("username", username);
    fd.append("projectImage", projectImage);
    fd.append("projectName", projectName);
    fd.append("projectTag", "");
    fd.append("projectTool", projectTool);
    fd.append("projectLink", projectLink);
    fd.append("projectDescription", projectDescription);
    fd.append("likes", 0);
    fd.append("views", 0);
    event.preventDefault();
    setIsLoading(true);
    try {
      let responseData = await fetchResponse(projectEndpoints.postProject(), 4, fd);
      setAlertMessage(responseData.message);
      setShowingAlert(true);
      if (responseData.success) {
        setAlertTitle(successOf(responseData.status));
        navigate(`/profile/${username}`);
      }
      else {
        setAlertTitle(errorOf(responseData.status));
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setAlertTitle(errorOf(500));
      setAlertMessage(serverDown);
      setIsLoading(false);
      setShowingAlert(true);
    }
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <NavbarU />
      <section className="h-100 gradient-custom-2">
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-8">
              <div className="card text-center">
                <h5
                  className="fw-bold text-center mb-0 mt-2"
                  style={{ letterSpacing: 1 }}
                >
                  POST YOUR PROJECT
                </h5>
                <p
                  className="fst-italic text-center mb-2"
                  style={{ color: "#E41221" }}
                >
                  ( Click on the <b>pink</b> screen to upload an image )
                </p>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "rgb(228, 18, 77)", height: 300 }}
                >
                  <div className="mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={handleImageUpload}
                      ref={imageUploader}
                      style={{ display: "none" }}
                    />
                    <div
                      style={{ height: "300px", width: "734px" }}
                      onClick={() => imageUploader.current.click()}
                    >
                      <img
                        ref={uploadedImage}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        alt={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <PostProjectForm
                    projectName={projectName}
                    setProjectName={setProjectName}
                    projectTool={projectTool}
                    setProjectTool={setProjectTool}
                    projectLink={projectLink}
                    setProjectLink={setProjectLink}
                    projectDescription={projectDescription}
                    setProjectDescription={setProjectDescription}
                    PostProject={PostProject}
                  />
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

export default PostProject;
