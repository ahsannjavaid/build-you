import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavbarU from '../components/NavbarU'
import { BASE_URL } from '../services/config'

const Profile = () => {

  const navigate = useNavigate()

  const localUsername = useParams().username

  const [profileImage, setProfileImage] = useState(null)
  const [phoneNum, setPhoneNum] = useState('')
  const [email, setEmail] = useState('')
  const [countryName, setCountryName] = useState('')
  const [profession, setProfession] = useState('')
  const [description, setDescription] = useState('')
  const [profiles, setProfiles] = useState([])
  let [pos, setPos] = useState(0)

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

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
    getProfiles()
  }, [])

  const HandleClick = () => {
    let buildCheck = true
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i].username === localUsername) {
        buildCheck = false
      }
    }
    if (buildCheck) {
      pos = 1
      setPos(pos)
    }
    else {
      pos = 2
      setPos(pos)
    }
  }

  const handleImageUpload = e => {
    setProfileImage(e.target.files[0])
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const SubmitProfile = () => {
    let username = localUsername
    const projects = 0, followers = 0, following = 0
    var fd = new FormData()
    fd.append("username", username)
    fd.append("phoneNum", phoneNum)
    fd.append("email", email)
    fd.append("countryName", countryName)
    fd.append("profession", profession)
    fd.append("description", description)
    fd.append("projects", projects)
    fd.append("followers", followers)
    fd.append("following", following)
    fd.append("profileImage", profileImage)
    if (username && profession && description) {
      fetch(`${BASE_URL}profiles`, {
        method: 'post',
        body: fd
      }).then((res) => {
        res.json().then((data) => {
          console.log(data)
        })
      })
      alert("Successfully posted!")
      navigate(`/profile/${localUsername}`)
    }
    else {
      alert("Please fill the form completely!")
    }
  }

  if (pos === 0) {
    return (
      <>
        <NavbarU />
        <div className='container container-sm mt-5 mb-5 text-center'>
          <div className='row'>
            <div className='col col-sm-3'></div>
            <div className='col col-sm-6'>
              <h6>Assalam-u-Alaikum <b style={{ color: '#E41221' }}>{localUsername}</b>!</h6>
              <img className='img-fluid rounded shadow mb-2' src='/images/welcome.jpg' alt='welcome' />
              <p><i>We are delighted to have you among us. On behalf of all the members and the management, we would like to extend our warmest welcome and good wishes!</i></p>
              <p style={{ color: '#E41221', fontWeight: '500' }}>
                Let us
                <button onClick={HandleClick} className='btn btn-danger ms-2 pt-1' type='button'>
                  <img src='/images/white_logo_0.0.png' alt='logo' width={"70px"} height={"18.18px"} />
                </button>
              </p>
            </div>
            <div className='col col-sm-3'></div>
          </div>
        </div>
      </>
    )
  }

  else if (pos === 1) {
    return (
      <>
        <NavbarU />
        <section className='gradient-custom-2'>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card mt-4 mb-4" style={{ borderRadius: '1rem' }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img src="/images/skills.jpg" alt="login form" className="img" width={"390px"} height={"670px"} style={{ borderRadius: '1rem 0 0 1rem' }} />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5">
                        <form encType='multipart/form-data'>
                          <div className="d-flex align-items-center pb-1">
                            <img src='/images/logo0.0.png' alt='logo' width={"100px"} height={"26px"} />
                          </div>
                          <h5 className="fw-normal pb-3" style={{ letterSpacing: 1 }}>Build your Profile!</h5>
                          <div className='row mb-2'>
                          </div>
                          <div className='mb-3'>
                            Profile Picture<span className='ms-2 fst-italic' style={{ color: '#E41221' }}>( Click the Square to upload a Photo )</span>
                            <input type="file" accept="image/*" name="file" onChange={handleImageUpload} ref={imageUploader} style={{ display: "none" }} />
                            <div className='mt-2' style={{ height: "60px", width: "60px" }} onClick={() => imageUploader.current.click()}>
                              <img ref={uploadedImage} style={{ width: "100%", height: "100%" }} alt={''} />
                            </div>
                          </div>
                          <div>
                            <div className='row'>
                              <div className='col col-5'>
                                <div className="mb-3">
                                  <label htmlFor="phone" className="form-label">Phone Number</label>
                                  <input onChange={(event) => setPhoneNum(event.target.value)} value={phoneNum} type="text" className="form-control" id="phone" placeholder="+92 315 4807718" />
                                </div>
                              </div>
                              <div className='col col-7'>
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email</label>
                                  <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" id="email" placeholder="ahsannjavaid@gmail.com" />
                                </div>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col col-5'>
                                <div className="mb-3">
                                  <label htmlFor="countryName" className="form-label">Country Name</label>
                                  <input onChange={(event) => setCountryName(event.target.value)} value={countryName} type="text" className="form-control" id="countryName" />
                                </div>
                              </div>
                              <div className='col col-7'>
                                <div className="mb-3">
                                  <label htmlFor="profession" className="form-label">Profession</label>
                                  <input onChange={(event) => setProfession(event.target.value)} value={profession} type="text" className="form-control" id="profession" placeholder="e.g., Graphic Designer" />
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                              <textarea onChange={(event) => setDescription(event.target.value)} value={description} className="form-control" id="exampleFormControlTextarea1" rows={3} />
                            </div>
                          </div>
                          <div className="pt-1 mb-4">
                            <button onClick={SubmitProfile} className="btn btn-lg btn-dark btn-block" type="submit">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
      </>
    )
  }
  else if (pos === 2) {
    return (
      <>
      <NavbarU />
        <div className='text-center' style={{ color: '#E41221', margin: '2.6in', marginBottom: '3in' }}>
          <h5>You already have a profile <Link to={`/profile/${localUsername}`}>
            <button className='btn btn-danger mb-1 ms-2'>View</button>
          </Link>
          </h5>
        </div>
      </>
    )
  }
}

export default Profile