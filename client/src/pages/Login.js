import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { BASE_URL } from '../services/helper'

const Login = () => {

  localStorage.clear()
  
  const navigate = useNavigate()
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  let [profiles, setProfiles] = useState([])

  const getUsers = async () => {
    let result = await fetch(`${BASE_URL}users-details`)
    if (result) {
      result = await result.json()
      setUsers(result)
    }
    else {
      console.log("Users not found!")
    }
  }

  const getProfiles = async () => {
    let result = await fetch(`${BASE_URL}profiles-details`)
    if (result) {
      result = await result.json()
      setProfiles(result)
    }
    else {
      console.log("Profiles not found!")
    }
  }

  useEffect(() => {
    getUsers()
    getProfiles()
  }, [])

  const LoginCheck = () => {
    let check = false, buildCheck = true
    if (username && password) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          check = true
        }
      }
      if (check) {
        for (let i = 0; i < profiles.length; i++) {
          if (profiles[i].username === username) {
            buildCheck = false
            navigate(`/profile/${username}`)
          }
        }
        if (buildCheck) {
          navigate(`/user-home/${username}`)
        }
      }
      else {
        alert("Incorrect credentials!")
      }
    }
    else {
      alert("Please fill the form!")
    }
  }

  return (
    <div>
      <Navbar />
      <section className="vh-100 gradient-custom-2">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="/images/login.jpg" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5">
                      <form>
                        <div className="d-flex align-items-center pb-1">
                          <img src='/images/logo0.0.png' alt='logo' width={"100px"} height={"26px"} />
                        </div>
                        <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: 1 }}>Sign into your account</h5>
                        <div className="form-outline mb-4">
                          <input onChange={(event) => setUsername(event.target.value)} value={username} type="text" id="form2Example17" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2Example17">Username</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" id="form2Example27" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button onClick={LoginCheck} className="btn btn-lg btn-dark btn-block" type="button">Login</button>
                        </div>
                        <p style={{ color: '#000' }}>Don't have an account? <Link to={"/signup"} style={{ color: '#E41221' }}>Register here</Link></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login