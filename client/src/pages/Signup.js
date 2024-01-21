import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { BASE_URL } from '../services/config'

const Signup = () => {

  localStorage.clear()

  const navigate = useNavigate()

  let [fname, setFname] = useState('')
  let [lname, setLname] = useState('')
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

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

  useEffect(() => {
    getUsers()
  }, [])

  const Register = () => {
    let check = true
    if (fname && lname && username && password) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          check = false
        }
      }
      if (check) {
        fetch(`${BASE_URL}users`, {
          method: 'post',
          body: JSON.stringify({ fname, lname, username, password }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        alert("Successfully registered!")
        navigate(`/user-home/${username}`)
      }
      else {
        alert("Username must be Unique!")
      }
    }
    else {
      alert("Please fill the form completely!")
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
                    <img src="/images/signup(visibled).jpg" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5">
                      <form>
                        <div className="d-flex align-items-center pb-1">
                          <img src='/images/logo0.0.png' alt='logo' width={"100px"} height={"26px"} />
                        </div>
                        <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: 1 }}>Register yourself please!</h5>
                        <div className='row mb-4'>
                          <div className="col">
                            <input onChange={(event) => setFname(event.target.value)} value={fname} type="text" id="fname" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="fname">First Name</label>
                          </div>
                          <div className="col">
                            <input onChange={(event) => setLname(event.target.value)} value={lname} type="text" id="lname" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="lname">Last Name</label>
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <input onChange={(event) => setUsername(event.target.value)} value={username} type="text" id="form2Example17" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2Example17">Username <i className='ms-2' style={{ color: '#E41221' }}>( Your Username must be Unique! )</i></label>
                        </div>
                        <div className="form-outline mb-4">
                          <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" id="form2Example27" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button onClick={Register} className="btn btn-lg btn-dark btn-block" type="submit">Register</button>
                        </div>
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

export default Signup