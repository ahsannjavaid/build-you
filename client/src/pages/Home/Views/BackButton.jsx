import React from "react";

export default function BackButton({ setSearchedProjects }) {
  return (
    <div className="text-center mt-3">
      <button
        onClick={() => setSearchedProjects([])}
        className="btn btn-danger"
      >
        Back
      </button>
    </div>
  );
}
