import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProfileView from "../User/Home/Views/ProfileView";
import { fetchResponse } from "../../services/service";
import { profileEndpoints } from "../../services/endpoints/profileEndpoints";
import { errorOf, serverDown } from "../../helper/responseMessages";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";

const ShowOwner = () => {
  const localUsername = useParams().username;

  let [profile, setProfile] = useState([]);
  let [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function getProfileAndProjects() {
      try {
        let responseData = await fetchResponse(
          profileEndpoints.getProfileAndProjects(localUsername),
          0,
          null
        );
        if (!responseData.success) {
          setAlertTitle(errorOf(responseData.status));
          setAlertMessage(responseData.message);
          setShowingAlert(true);
        }
        setProfile(responseData.data);
        setProjectsData(responseData.projectsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setAlertTitle(errorOf(500));
        setAlertMessage(serverDown);
        setIsLoading(false);
        setShowingAlert(true);
      }
    }
    getProfileAndProjects();
  }, [localUsername]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12">
              <ProfileView 
              isReadable={true}
              profileId={profile._id}
              name={profile.name}
              projects={profile.projects}
              profession={profile.profession}
              description={profile.description}
              countryName={profile.countryName}
              email={profile.email}
              phoneNum={profile.phoneNum}
              projectsData={projectsData}
              />
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

export default ShowOwner;
