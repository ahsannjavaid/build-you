import React from "react";

export default function PostProjectForm({
  projectName,
  setProjectName,
  projectTool,
  setProjectTool,
  projectLink,
  setProjectLink,
  projectDescription,
  setProjectDescription,
  PostProject,
}) {
  return (
    <form>
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name *
          </label>
          <input
            onChange={(event) => setProjectName(event.target.value)}
            value={projectName}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tools" className="form-label">
            Tools/Software used *
          </label>
          <input
            onChange={(event) => {
              setProjectTool(event.target.value);
            }}
            value={projectTool}
            type="text"
            className="form-control"
            id="tools"
            placeholder="e.g., Adobe Illustrator"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            Link (if any)
          </label>
          <input
            onChange={(event) => {
              setProjectLink(event.target.value);
            }}
            value={projectLink}
            type="text"
            className="form-control"
            id="link"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            onChange={(event) => {
              setProjectDescription(event.target.value);
            }}
            value={projectDescription}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
          />
        </div>
      </div>
      <div className="pt-1">
        <button
          onClick={(event) => PostProject(event)}
          className="btn btn-lg btn-dark btn-block"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
}
