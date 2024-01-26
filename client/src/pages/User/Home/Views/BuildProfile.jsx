import React from "react";
import BuildProfileForm from "./BuildProfileForm";

export default function BuildProfile({
  uploadedImage,
  handleImageUpload,
  imageUploader,
  phoneNum,
  setPhoneNum,
  email,
  setEmail,
  countryName,
  setCountryName,
  profession,
  setProfession,
  description,
  setDescription,
  SubmitProfile,
}) {
  return (
    <section className="gradient-custom-2">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
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
                    style={{ borderRadius: "1rem 0 0 1rem", objectFit: "fill" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5">
                    <BuildProfileForm
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
