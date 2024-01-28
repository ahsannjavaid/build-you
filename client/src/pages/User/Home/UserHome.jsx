import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarU from "../../../components/NavbarU";
import BuildProfile from "./Views/BuildProfile";
import Welcome from "./Views/Welcome";
import { profileEndpoints } from "../../../services/endpoints/profileEndpoints";
import { fetchResponse } from "../../../services/service";
import { serverDown, errorOf, successOf } from "../../../helper/responseMessages";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";

const Profile = () => {
  const navigate = useNavigate();

  const localUsername = useParams().username;

  const [profileImage, setProfileImage] = useState(null);
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [countryName, setCountryName] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [buildProfile, setBuildProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const HandleClick = () => {
    setBuildProfile(true);
  };

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

  const SubmitProfile = async (event) => {
    var fd = new FormData();
    fd.append("username", localUsername);
    fd.append("phoneNum", phoneNum);
    fd.append("email", email);
    fd.append("countryName", countryName);
    fd.append("profession", profession);
    fd.append("description", description);
    fd.append("projects", 0);
    fd.append("followers", 0);
    fd.append("following", 0);
    fd.append("profileImage", profileImage);
    event.preventDefault();
    setIsLoading(true);
    try {
      let responseData = await fetchResponse(profileEndpoints.registerProfile(), 4, fd);
      setAlertMessage(responseData.message);
      setShowingAlert(true);
      if (responseData.success) {
        setAlertTitle(successOf(responseData.status ?? 200));
        localStorage.setItem("hasProfile", 1);
        navigate(`/profile/${localUsername}`);
      }
      else {
        setAlertTitle(errorOf(responseData.status ?? 400));
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

  if (isLoading) return <Spinner />

  return (
    <>
      <NavbarU />
      {!buildProfile ? (
        <Welcome localUsername={localUsername} HandleClick={HandleClick} />
      ) : (
        <BuildProfile
          uploadedImage={uploadedImage}
          handleImageUpload={handleImageUpload}
          imageUploader={imageUploader}
          phoneNum={phoneNum}
          setPhoneNum={setPhoneNum}
          email={email}
          setEmail={setEmail}
          countryName={countryName}
          setCountryName={setCountryName}
          profession={profession}
          setProfession={setProfession}
          description={description}
          setDescription={setDescription}
          SubmitProfile={SubmitProfile}
        />
      )}
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
