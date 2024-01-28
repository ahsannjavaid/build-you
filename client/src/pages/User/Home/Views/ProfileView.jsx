import React from "react";
import { projectEndpoints } from "../../../../services/endpoints/projectEndpoints";
import { notFoundPositive } from "../../../../helper/responseMessages";
import Card from "../../../../components/Card";
import { profileEndpoints } from "../../../../services/endpoints/profileEndpoints";

export default function ProfileView({
  isReadable,
  EditPanel,
  name,
  profileId,
  profession,
  projects,
  description,
  phoneNum,
  countryName,
  email,
  projectsData,
}) {
  return (
    <div className="col col-lg-12">
      <div className="card">
        <div
          className="rounded-top text-white d-flex flex-row"
          style={{ backgroundColor: "#000", height: 200 }}
        >
          <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
            <img
              src={`${profileEndpoints.getProfileImage(
                profileId
              )}?${Math.random()}`}
              alt="profile"
              className="img-fluid img-thumbnail mt-4 mb-2 border border-dark"
              style={{
                width: "150px",
                minHeight: "150px",
                zIndex: 1,
                objectFit: "contain",
              }}
            />
            {!isReadable ? (
              <button
                onClick={EditPanel}
                type="button"
                className="btn btn-outline-dark mt-2"
                data-mdb-ripple-color="dark"
                style={{ zIndex: 1 }}
              >
                Edit profile
              </button>
            ) : null}
          </div>
          <div className="ms-3" style={{ marginTop: 130 }}>
            <h3>{name}</h3>
            <p>{profession.toUpperCase()}</p>
          </div>
        </div>
        <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="d-flex justify-content-end text-center py-1">
            <div>
              <p className="mb-1 h5">{projects}</p>
              <p className="small text-muted mb-0">Projects</p>
            </div>
          </div>
        </div>
        <div className="card-body p-4 text-black">
          <hr />
          <div className="mb-3">
            <p className="lead fw-bolder mb-1">Description</p>
            <p className="fst-italic mb-1">{description}</p>
            <hr />
            <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
              <p className="fw-bold mb-2 text-secondary">
                <img
                  src="/images/location-pin.png"
                  alt="location"
                  width={"20px"}
                  height={"25px"}
                  style={{ marginRight: "10px" }}
                />
                {countryName}
              </p>
              <p className="fw-bold mb-2 text-secondary">
                <img
                  src="/images/email.png"
                  alt="email"
                  width={"22px"}
                  height={"18px"}
                  style={{ marginRight: "8px" }}
                />
                {email}
              </p>
              <p className="fw-bold mb-0 text-secondary">
                <img
                  src="/images/phone-call.png"
                  alt="phone"
                  width={"21px"}
                  height={"21px"}
                  style={{ marginRight: "8px" }}
                />
                {phoneNum}
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            {projectsData.length ? (
              projectsData.map((x, ind) => (
                <div key={ind} className="col">
                  <Card
                    isReadable={isReadable ?? false}
                    id={x._id}
                    name={x.projectName}
                    image={projectEndpoints.getProjectImage(x._id)}
                    description={x.projectDescription}
                    username={x.username}
                  />
                </div>
              ))
            ) : (
              <div>{notFoundPositive("Projects")}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
