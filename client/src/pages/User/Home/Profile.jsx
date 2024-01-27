import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarU from "../../../components/NavbarU";
import Alert from "../../../components/Alert";
import { fetchResponse } from "../../../services/service";
import { profileEndpoints } from "../../../services/endpoints/profileEndpoints";
import Spinner from "../../../components/Spinner";
import EditProfile from "./Views/EditProfile";
import { errorOf, serverDown, successOf } from "../../../helper/responseMessages";
import ProfileView from "./Views/ProfileView";

const Profile = () => {
  let localUsername = useParams().username;

  const [profileImage, setProfileImage] = useState(null);
  let [phoneNumE, setPhoneNumE] = useState("");
  let [emailE, setEmailE] = useState("");
  let [countryNameE, setCountryNameE] = useState("");
  let [professionE, setProfessionE] = useState("");
  let [descriptionE, setDescriptionE] = useState("");
  let [editPanelCheck, setEditPanelCheck] = useState(false);
  const [profile, setProfile] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

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
  }, [localUsername, editPanelCheck]);

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
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

  const EditPanel = () => {
    setPhoneNumE(profile.phoneNum);
    setEmailE(profile.email);
    setCountryNameE(profile.countryName);
    setProfessionE(profile.profession);
    setDescriptionE(profile.description);
    setEditPanelCheck(true);
  };

  const UpdateProfile = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    var fd = new FormData();
    fd.append("username", localUsername);
    fd.append("phoneNum", phoneNumE);
    fd.append("email", emailE);
    fd.append("countryName", countryNameE);
    fd.append("profession", professionE);
    fd.append("description", descriptionE);
    fd.append("projects", profile.projects);
    fd.append("followers", profile.followers);
    fd.append("following", profile.following);
    fd.append("profileImage", profileImage);
    try {
      let responseData = await fetchResponse(profileEndpoints.editProfile(profile._id), 5, fd);
      setAlertMessage(responseData.message);
      setShowingAlert(true);
      if (responseData.success) {
        setAlertTitle(successOf(responseData.status ?? 200));
        setEditPanelCheck(false);
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
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <NavbarU />
      <section className="gradient-custom-2">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {editPanelCheck ? (
              <EditProfile
                handleImageUpload={handleImageUpload}
                imageUploader={imageUploader}
                uploadedImage={uploadedImage}
                phoneNumE={phoneNumE}
                setPhoneNumE={setPhoneNumE}
                emailE={emailE}
                setEmailE={setEmailE}
                setEditPanelCheck={setEditPanelCheck}
                countryNameE={countryNameE}
                setCountryNameE={setCountryNameE}
                professionE={professionE}
                setProfessionE={setProfessionE}
                descriptionE={descriptionE}
                setDescriptionE={setDescriptionE}
                UpdateProfile={UpdateProfile}
                profileId={profile._id}
              />
            ) : (
              <ProfileView
                EditPanel={EditPanel}
                name={profile.name}
                profileId={profile._id}
                profession={profile.profession}
                countryName={profile.countryName}
                email={profile.email}
                projects={profile.projects}
                description={profile.description}
                phoneNum={profile.phoneNum}
                projectsData={projectsData}
              />
            )}
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

export default Profile;
