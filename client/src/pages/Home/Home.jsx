import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { fetchResponse } from "../../services/service";
import { projectEndpoints } from "../../services/endpoints/projectEndpoints";
import Spinner from "../../components/Spinner";

const Home = () => {
  let [searchedProjects, setSearchedProjects] = useState([]);
  let [tagFound, setTagFound] = useState(false);
  let [searchClick, setSearchClick] = useState(false);
  const [projects, setProjects] = useState();
  const [searched, setSearched] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        let data = await fetchResponse(projectEndpoints.getProjects(), 0, null);
        if (!data.success) {
          alert(data.message);
        }
        setProjects(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getProjects();
  }, []);

  const FilteringSearch = () => {
    let a = 0;
    for (let i = 0; i < projects.length; i++) {
      if (
        projects[i].projectTag === searched ||
        projects[i].projectTag.toUpperCase() === searched ||
        projects[i].projectTag.toLowerCase() === searched ||
        projects[i].projectName === searched ||
        projects[i].projectName.toUpperCase() === searched ||
        projects[i].projectName.toLowerCase() === searched
      ) {
        tagFound = true;
        setTagFound(tagFound);
        searchedProjects[a++] = { ...projects[i] };
      }
    }
    searchClick = true;
    setSearchClick(searchClick);
    setSearchedProjects(searchedProjects);
  };

  if (isLoading) return <Spinner />

  if (!tagFound && searchClick) {
    return (
      <>
        <Navbar />
        <div className="container p-5">
          <form className="d-flex">
            <input
              onChange={(event) => setSearched(event.target.value)}
              value={searched}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              onClick={FilteringSearch}
              className="btn btn-outline-danger"
              type="button"
            >
              Search
            </button>
          </form>
          <div
            className="alert alert-danger alert-dismissible mt-2"
            role="alert"
          >
            Result not found!
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="btn-close btn-sm"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
          <br />
          <hr />
          <br />
          <div className="row">
            {projects.map((x, ind) => (
              <div key={ind} className="col">
                <Card
                  image={projectEndpoints.getProjectImage(x._id)}
                  name={x.projectName}
                  username={x.username}
                  _id={x._id}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (projects && !tagFound) {
    return (
      <>
        <Navbar />
        <div className="container p-5">
          <form className="d-flex">
            <input
              onChange={(event) => setSearched(event.target.value)}
              value={searched}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              onClick={FilteringSearch}
              className="btn btn-outline-danger"
              type="button"
            >
              Search
            </button>
          </form>
          <br />
          <hr />
          <br />
          <div className="row">
            {projects.map((x, ind) => (
              <div key={ind} className="col">
                <Card
                  image={projectEndpoints.getProjectImage(x._id)}
                  name={x.projectName}
                  username={x.username}
                  _id={x._id}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (projects && tagFound) {
    return (
      <>
        <Navbar />
        <div className="container p-5">
          <div className="text-center">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-danger"
            >
              Back
            </button>
          </div>
          <br />
          <hr />
          <br />
          <div className="row">
            {searchedProjects.map((x, ind) => (
              <div key={ind} className="col">
                <Card
                  image={projectEndpoints.getProjectImage(x._id)}
                  name={x.projectName}
                  username={x.username}
                  _id={x._id}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="text-center text-danger mt-5 mb-5">
          <h1>OOPS!</h1>
          <p>Check your Internet conection!</p>
        </div>
      </>
    );
  }
};

export default Home;
