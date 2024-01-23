import React from "react";

export default function Spinner() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
    <div className="spinner-grow text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    </div>
  );
}
