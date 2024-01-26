import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { userEndpoints } from "../../services/endpoints/userEndpoints";
import { errorOf, serverDown } from "../../helper/responseMessages";
import Spinner from "../../components/Spinner";
import { fetchResponse } from "../../services/service";
import Alert from "../../components/Alert";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showingAlert, setShowingAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        let responseData = await fetchResponse(
          userEndpoints.getUsers(),
          0,
          null
        );
        if (!responseData.success) {
          setAlertTitle(errorOf(responseData.status));
          setAlertMessage(responseData.message);
          setShowingAlert(true);
        }
        setUsers(responseData.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setAlertTitle(errorOf(500));
        setAlertMessage(serverDown);
        setIsLoading(false);
        setShowingAlert(true);
      }
    };
    getUsers();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <h3
        className="text-center fw-bolder mt-4"
        style={{
          color: "#E41221",
          letterSpacing: "3px",
          textDecoration: "underline",
        }}
      >
        USERS
      </h3>
      <div className="container mt-5 mb-5">
        <table className="table table-striped">
          <thead>
            <tr style={{ color: "#E41221" }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((x, ind) => (
              <tr key={ind}>
                <th scope="row" style={{ color: "#E41221" }}>
                  {++ind}
                </th>
                <td>
                  {x.fname} {x.lname}
                </td>
                <td>{x.username}</td>
                <td>{x.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Admin;
