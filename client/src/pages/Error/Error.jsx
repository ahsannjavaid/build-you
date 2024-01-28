import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center text-danger vh-100">
      <div className="text-center">
        <h6>Page not found!</h6>
        <h1>ERR: 404</h1>
        <div className="p-5">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
