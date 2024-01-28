import React from 'react'

export default function ProjectForm({
    project, action, actionTitle
}) {
  return (
    <form>
    <div className="d-flex align-items-center pb-1">
      <img
        src="/images/logo0.0.png"
        alt="logo"
        width={"100px"}
        height={"26px"}
      />
    </div>
    <h5
      className="fw-normal mb-4 pb-3"
      style={{ letterSpacing: 1 }}
    >
      Project Info
    </h5>
    <div className="form-outline mb-3">
      <label className="form-label" htmlFor="fname">
        Project Name
      </label>
      <input
        readOnly
        defaultValue={project.projectName}
        type="text"
        id="fname"
        className="form-control form-control-lg"
      />
    </div>
    <div className="row mb-3">
      <div className="col">
        <label
          className="form-label"
          htmlFor="form2Example17"
        >
          Tag
        </label>
        <input
          readOnly
          defaultValue={project.projectTag}
          type="text"
          id="form2Example17"
          className="form-control form-control"
        />
      </div>
      <div className="col">
        <label
          className="form-label"
          htmlFor="form2Example27"
        >
          Tool(s)
        </label>
        <input
          readOnly
          defaultValue={project.projectTool}
          type="text"
          id="form2Example27"
          className="form-control form-control"
        />
      </div>
    </div>
    <div className="form-outline mb-3">
      <label
        className="form-label"
        htmlFor="form2Example27"
      >
        Link
      </label>
      <input
        readOnly
        defaultValue={project.projectLink}
        type="text"
        id="form2Example27"
        className="form-control form-control"
      />
    </div>
    <div className="mb-3">
      <label
        htmlFor="exampleFormControlTextarea1"
        className="form-label"
      >
        Description
      </label>
      <textarea
        readOnly
        defaultValue={project.projectDescription}
        className="form-control"
        id="exampleFormControlTextarea1"
        rows={3}
      />
    </div>
    <div className="pt-1">
      <button
        onClick={action}
        className={`btn btn-lg ${actionTitle === "Delete" ? "btn-danger" : "btn-dark"} btn-block`}
        type="button"
      >
        {actionTitle}
      </button>
    </div>
  </form>
  )
}
