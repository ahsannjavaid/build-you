import React from "react";

export default function BuildProfileForm({
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
    <form encType="multipart/form-data">
      <div className="d-flex align-items-center pb-1">
        <img
          src="/images/logo0.0.png"
          alt="logo"
          width={"100px"}
          height={"26px"}
        />
      </div>
      <h5 className="fw-normal pb-3" style={{ letterSpacing: 1 }}>
        Build your Profile!
      </h5>
      <div className="row mb-2"></div>
      <div className="mb-3">
        Profile Picture
        <span className="ms-2 fst-italic" style={{ color: "#E41221" }}>
          ( Click the Square to upload a Photo )
        </span>
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{ display: "none" }}
        />
        <div
          className="mt-2"
          style={{ height: "60px", width: "60px" }}
          onClick={() => imageUploader.current.click()}
        >
          <img
            ref={uploadedImage}
            style={{ width: "100%", height: "100%" }}
            alt={""}
          />
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col col-5">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                onChange={(event) => setPhoneNum(event.target.value)}
                value={phoneNum}
                type="text"
                className="form-control"
                id="phone"
                placeholder="+92 315 4807718"
              />
            </div>
          </div>
          <div className="col col-7">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                className="form-control"
                id="email"
                placeholder="ahsannjavaid@gmail.com"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-5">
            <div className="mb-3">
              <label htmlFor="countryName" className="form-label">
                Country Name
              </label>
              <input
                onChange={(event) => setCountryName(event.target.value)}
                value={countryName}
                type="text"
                className="form-control"
                id="countryName"
              />
            </div>
          </div>
          <div className="col col-7">
            <div className="mb-3">
              <label htmlFor="profession" className="form-label">
                Profession
              </label>
              <input
                onChange={(event) => setProfession(event.target.value)}
                value={profession}
                type="text"
                className="form-control"
                id="profession"
                placeholder="e.g., Graphic Designer"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
          />
        </div>
      </div>
      <div className="pt-1 mb-4">
        <button
          onClick={(event) => SubmitProfile(event)}
          className="btn btn-lg btn-dark btn-block"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
