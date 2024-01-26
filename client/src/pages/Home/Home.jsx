import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { fetchResponse } from "../../services/service";
import { projectEndpoints } from "../../services/endpoints/projectEndpoints";
import Spinner from "../../components/Spinner";
import SearchForm from "./Views/SearchForm";
import Alert from "../../components/Alert";
import BackButton from "./Views/BackButton";
import { errorOf, notFound, serverDown } from "../../helper/responseMessages";

const Home = () => {
  let [searchedProjects, setSearchedProjects] = useState([]);
  const [projects, setProjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      try {
        let responseData = await fetchResponse(
          projectEndpoints.getProjects(),
          0,
          null
        );
        if (!responseData.success) {
          setShowingAlert(true);
          setAlertTitle(errorOf(responseData.status));
          setAlertMessage(responseData.message);
        }
        setProjects(responseData.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setAlertTitle(errorOf(500));
        setAlertMessage(serverDown);
        setIsLoading(false);
        setShowingAlert(true);
      }
    };
    getProjects();
  }, []);

  const FilteringSearch = (event, searched) => {
    event.preventDefault();
    setIsLoading(true);
    let filteredResult = projects.filter((project) => {
      const searchWords = searched.toLowerCase().split(' ');
      const projectWords = `${project.projectTag} ${project.projectName}`.toLowerCase().split(' ');
    
      // Check if there's at least one common word
      return searchWords.some(word => projectWords.includes(word));
    });    
    
    if (!filteredResult.length) {
      setAlertTitle(errorOf(404));
      setAlertMessage(notFound("Project"));
      setShowingAlert(true);
    } else setSearchedProjects(filteredResult);
    setIsLoading(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="container p-5">
        <SearchForm FilteringSearch={FilteringSearch} />
        {searchedProjects.length ? (
          <BackButton setSearchedProjects={setSearchedProjects} />
        ) : null}
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
      <Alert
        show={showingAlert}
        setShow={setShowingAlert}
        message={alertMessage}
        title={alertTitle}
      />
    </>
  );
};

export default Home;
