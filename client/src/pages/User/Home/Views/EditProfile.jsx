import React from "react";
import EditProfileForm from "./EditProfileForm";

export default function EditProfile({
  handleImageUpload,
  imageUploader,
  uploadedImage,
  phoneNumE,
  setPhoneNumE,
  emailE,
  setEmailE,
  setEditPanelCheck,
  countryNameE,
  setCountryNameE,
  professionE,
  setProfessionE,
  descriptionE,
  setDescriptionE,
  UpdateProfile,
  profileId
}) {
  return (
    <div className="col col-xl-10">
      <div className="card mt-4 mb-4" style={{ borderRadius: "1rem" }}>
        <div className="row g-0">
          <div className="col-md-6 col-lg-5 d-none d-md-block">
            <img
              src="/images/skills.jpg"
              alt="login form"
              className="img"
              width={"390px"}
              height={"670px"}
              style={{ borderRadius: "1rem 0 0 1rem" }}
            />
          </div>
          <div className="col-md-6 col-lg-7 d-flex align-items-center">
            <div className="card-body p-4 p-lg-5">
              <EditProfileForm
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
                profileId={profileId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
