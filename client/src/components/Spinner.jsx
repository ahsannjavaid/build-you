import React from "react";

export default function Spinner({ showingApologoies }) {
  return (
    <div
    className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        zIndex: 1,
        textAlign: "center",
      }}
    >
      {showingApologoies ? (
        <div
          className="bg-danger text-white rounded p-3 mb-3"
          style={{ maxWidth: "200px" }}
        >
          <p>
            Since, I am using free hosting services, so you might have to wait
            <b> 1 minute </b>
            or so. If it still continues to spin then{" "}
            <a className="text-white" href="/#/">
              refresh
            </a>
            .
          </p>
        </div>
      ) : null}
      <div className="spinner-grow text-danger" role="status" />
    </div>
  );
}
