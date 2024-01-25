import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { fetchResponse } from "../../services/service";
import { projectEndpoints } from "../../services/endpoints/projectEndpoints";
import Spinner from "../../components/Spinner";
import SearchForm from "./Views/SearchForm";
import Alert from "./Views/Alert";
import BackButton from "./Views/BackButton";

const Home = () => {
  let [searchedProjects, setSearchedProjects] = useState([]);
  const [projects, setProjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showingAlert, setShowingAlert] = useState(false);

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

  const FilteringSearch = (event, searched) => {
    event.preventDefault();
    setIsLoading(true);
    let filteredResult = projects.filter(
      (project) =>
        project.projectTag === searched ||
        project.projectTag.toUpperCase() === searched ||
        project.projectTag.toLowerCase() === searched ||
        project.projectName === searched ||
        project.projectName.toUpperCase() === searched ||
        project.projectName.toLowerCase() === searched
    );
    if (!filteredResult.length) setShowingAlert(true);
    else setSearchedProjects(filteredResult);
    setIsLoading(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="container p-5">
        <SearchForm FilteringSearch={FilteringSearch} />
        {searchedProjects.length ? <BackButton setSearchedProjects={setSearchedProjects}/> : null}
        <br />
        <hr />
        <br />
        <div className="row">
          {searchedProjects.length
            ? searchedProjects.map((x, ind) => (
                <div key={ind} className="col">
                  <Card
                    image={projectEndpoints.getProjectImage(x._id)}
                    name={x.projectName}
                    username={x.username}
                    _id={x._id}
                  />
                </div>
              ))
            : projects.map((x, ind) => (
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
      {showingAlert ? <Alert setShowingAlert={setShowingAlert} /> : null}
    </>
  );
};

export default Home;
