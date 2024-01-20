import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer';
import UserHome from './pages/UserHome';
import PostProject from './pages/PostProject';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import SingleProjectR from './pages/SingleProjectR';
import SingleProjectW from './pages/SingleProjectW';
import ShowOwner from './pages/ShowOwner';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='user-home/:username' element={<UserHome />} />
          <Route path='post-project/:username' element={<PostProject />} />
          <Route path='admin' element={<Admin />} />
          <Route path='profile/:username' element={<Profile />} />
          <Route path='single-project-read/:id' element={<SingleProjectR />} />
          <Route path='single-project-write/:username/:id' element={<SingleProjectW />} />
          <Route path='show-owner/:username' element={<ShowOwner />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;