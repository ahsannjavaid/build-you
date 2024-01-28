import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/User/Login/Login";
import Signup from "./pages/User/Signup/Signup";
import Footer from "./components/Footer";
import UserHome from "./pages/User/Home/UserHome";
import PostProject from "./pages/User/PostProject/PostProject";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/User/Home/Profile";
import SingleProjectR from "./pages/Project/SingleProjectR";
import SingleProjectW from "./pages/Project/SingleProjectW";
import ShowOwner from "./pages/Profile/ShowOwner";
import Error from "./pages/Error/Error";

function App() {
  const hasProfile = parseInt(localStorage.getItem("hasProfile"));

  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="user-home/:username" element={hasProfile ? <Profile /> : <UserHome />} />
          <Route path="post-project/:username" element={<PostProject />} />
          <Route path="admin" element={<Admin />} />
          <Route path="profile/:username" element={hasProfile ? <Profile /> : <UserHome />}/>
          <Route path="single-project-read/:id" element={<SingleProjectR />} />
          <Route
            path="single-project-write/:username/:id"
            element={<SingleProjectW />}
          />
          <Route path="show-owner/:id/:username" element={<ShowOwner />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
