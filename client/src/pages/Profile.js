import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavbarU from '../components/NavbarU'
import CardP from '../components/CardP'
import { BASE_URL } from '../services/helper'

const Profile = () => {

    const navigate = useNavigate()

    let localUsername = useParams().username

    let imageName = "", profession = "", description = "", phoneNum = "", email = "", name = "", countryName = "", projects = 0, _id = 0
    let duplicateArray = [], a = 0

    const [profileImage, setProfileImage] = useState(null)
    let [phoneNumE, setPhoneNumE] = useState('')
    let [emailE, setEmailE] = useState('')
    let [countryNameE, setCountryNameE] = useState('')
    let [professionE, setProfessionE] = useState('')
    let [descriptionE, setDescriptionE] = useState('')
    let [editPanelCheck, setEditPanelCheck] = useState(false)
    const [profiles, setProfiles] = useState([])
    const [users, setUsers] = useState([])
    const [projectsP, setProjectsP] = useState([])

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

    const getProjects = async () => {
        let result = await fetch(`${BASE_URL}projects-details`)
        if (result) {
            result = await result.json()
            setProjectsP(result)
        }
        else {
            console.log("Projects not found!")
        }
    }

    useEffect(() => {
        getProfiles()
        getUsers()
        getProjects()
    }, [])

    if (projectsP) {
        for (let i = 0; i < projectsP.length; i++) {
            if (projectsP[i].username === localUsername) {
                duplicateArray[a++] = { ...projectsP[i] }
            }
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
    }

    const EditPanel = () => {
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].username === localUsername) {
                setPhoneNumE(profiles[i].phoneNum)
                setEmailE(profiles[i].email)
                setCountryNameE(profiles[i].countryName)
                setProfessionE(profiles[i].profession)
                setDescriptionE(profiles[i].description)
            }
        }
        editPanelCheck = true
        setEditPanelCheck(editPanelCheck)
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === localUsername) {
            name = users[i].fname + " " + users[i].lname
        }
    }

    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].username === localUsername) {
            _id = profiles[i]._id
            imageName = profiles[i].profileImage
            phoneNum = profiles[i].phoneNum
            email = profiles[i].email
            countryName = profiles[i].countryName
            profession = profiles[i].profession
            description = profiles[i].description
            projects = profiles[i].projects
        }
    }

    const UpdateProfile = () => {
        let username = localUsername
        const followers = 0, following = 0
        var fd = new FormData()
        fd.append("username", username)
        fd.append("phoneNum", phoneNumE)
        fd.append("email", emailE)
        fd.append("countryName", countryNameE)
        fd.append("profession", professionE)
        fd.append("description", descriptionE)
        fd.append("projects", projects)
        fd.append("followers", followers)
        fd.append("following", following)
        fd.append("profileImage", profileImage)
        fetch(`${BASE_URL}profile-details/${_id}`, {
            method: 'put',
            body: fd
        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
            })
        })
        alert("Successfully edited!")
        navigate(`/profile/${localUsername}`)
    }

    if (editPanelCheck) {
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
                                                    <h5 className="fw-normal pb-3" style={{ letterSpacing: 1 }}>Edit your Profile Info!</h5>
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
                                                                    <input onChange={(event) => setPhoneNumE(event.target.value)} value={phoneNumE} type="text" className="form-control" id="phone" placeholder="+92 315 4807718" />
                                                                </div>
                                                            </div>
                                                            <div className='col col-7'>
                                                                <div className="mb-3">
                                                                    <label htmlFor="email" className="form-label">Email</label>
                                                                    <input onChange={(event) => setEmailE(event.target.value)} value={emailE} type="email" className="form-control" id="email" placeholder="ahsannjavaid@gmail.com" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col col-5'>
                                                                <div className="mb-3">
                                                                    <label htmlFor="countryName" className="form-label">Country Name</label>
                                                                    <input onChange={(event) => setCountryNameE(event.target.value)} value={countryNameE} type="text" className="form-control" id="countryName" />
                                                                </div>
                                                            </div>
                                                            <div className='col col-7'>
                                                                <div className="mb-3">
                                                                    <label htmlFor="profession" className="form-label">Profession</label>
                                                                    <input onChange={(event) => setProfessionE(event.target.value)} value={professionE} type="text" className="form-control" id="profession" placeholder="e.g., Graphic Designer" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                                            <textarea onChange={(event) => setDescriptionE(event.target.value)} value={descriptionE} className="form-control" id="exampleFormControlTextarea1" rows={3} />
                                                        </div>
                                                    </div>
                                                    <div className="pt-1 mb-4">
                                                        <button onClick={UpdateProfile} className="btn btn-lg btn-dark btn-block" type="submit">Update</button>
                                                        <button onClick={() => setEditPanelCheck(false)} className="ms-2 btn btn-lg btn-dark btn-block" type="button">Cancel</button>
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

    else if (duplicateArray.length && imageName) {
        return (
            <>
                <NavbarU />
                <section className="h-100 gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-12">
                                <div className="card">
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 230 }}>
                                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                            <img src={`${BASE_URL}uploads/${imageName}`} alt="profile" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />
                                            <button onClick={EditPanel} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1, marginTop: '0.4in'  }}>
                                                Edit profile
                                            </button>
                                        </div>
                                        <div className="ms-3" style={{ marginTop: 130 }}>
                                            <h3>{name}</h3>
                                            <p>{profession}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="d-flex justify-content-end text-center py-1">
                                            <div>
                                                <p className="mb-1 h5">{projects}</p>
                                                <p className="small text-muted mb-0">Projects</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black"><hr />
                                        <div className="mb-3">
                                            <p className="lead fw-bolder mb-1">Description</p>
                                            <p className="fst-italic mb-1">{description}</p><hr />
                                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/location-pin.png' alt='location' width={"20px"} height={"25px"} style={{ marginRight: '10px' }} />{countryName}</p>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/email.png' alt='email' width={"22px"} height={"18px"} style={{ marginRight: '8px' }} />{email}</p>
                                                <p className="fw-bold mb-0 text-secondary"><img src='/images/phone-call.png' alt='phone' width={"21px"} height={"21px"} style={{ marginRight: '8px' }} />{phoneNum}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='row'>
                                            {
                                                duplicateArray.map((x, ind) =>
                                                    <div key={ind} className='col'>
                                                        <CardP
                                                            _id = {x._id}
                                                            name={x.projectName}
                                                            image={x.projectImage}
                                                            description={x.projectDescription}
                                                            username = {x.username} />
                                                    </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else if (duplicateArray.length && !imageName) {
        return (
            <>
                <NavbarU />
                <section className="h-100 gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-12">
                                <div className="card">
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 230 }}>
                                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                            <img src='/images/default_dp.png' alt='default' className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />
                                            <button onClick={EditPanel} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1, marginTop: '0.4in' }}>
                                                Edit profile
                                            </button>
                                        </div>
                                        <div className="ms-3" style={{ marginTop: 130 }}>
                                            <h3>{name}</h3>
                                            <p>{profession}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="d-flex justify-content-end text-center py-1">
                                            <div>
                                                <p className="mb-1 h5">{projects}</p>
                                                <p className="small text-muted mb-0">Projects</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black"><hr />
                                        <div className="mb-3">
                                            <p className="lead fw-bolder mb-1">Description</p>
                                            <p className="fst-italic mb-1">{description}</p><hr />
                                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/location-pin.png' alt='location' width={"20px"} height={"25px"} style={{ marginRight: '10px' }} />{countryName}</p>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/email.png' alt='email' width={"22px"} height={"18px"} style={{ marginRight: '8px' }} />{email}</p>
                                                <p className="fw-bold mb-0 text-secondary"><img src='/images/phone-call.png' alt='phone' width={"21px"} height={"21px"} style={{ marginRight: '8px' }} />{phoneNum}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='row'>
                                            {
                                                duplicateArray.map((x, ind) =>
                                                    <div key={ind} className='col'>
                                                        <CardP
                                                            name={x.projectName}
                                                            image={x.projectImage}
                                                            description={x.projectDescription}
                                                            username = {x.username} />
                                                    </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else if (imageName) {
        return (
            <>
                <NavbarU />
                <section className="h-100 gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-12">
                                <div className="card">
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 230 }}>
                                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                            <img src={`${BASE_URL}uploads/${imageName}`} alt="profile" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />
                                            <button onClick={EditPanel} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1, marginTop: '0.4in'  }}>
                                                Edit profile
                                            </button>
                                        </div>
                                        <div className="ms-3" style={{ marginTop: 130 }}>
                                            <h3>{name}</h3>
                                            <p>{profession}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="d-flex justify-content-end text-center py-1">
                                            <div>
                                                <p className="mb-1 h5">{projects}</p>
                                                <p className="small text-muted mb-0">Projects</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black"><hr />
                                        <div className="mb-3">
                                            <p className="lead fw-bolder mb-1">Description</p>
                                            <p className="fst-italic mb-1">{description}</p><hr />
                                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/location-pin.png' alt='location' width={"20px"} height={"25px"} style={{ marginRight: '10px' }} />{countryName}</p>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/email.png' alt='email' width={"22px"} height={"18px"} style={{ marginRight: '8px' }} />{email}</p>
                                                <p className="fw-bold mb-0 text-secondary"><img src='/images/phone-call.png' alt='phone' width={"21px"} height={"21px"} style={{ marginRight: '8px' }} />{phoneNum}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mb-4 text-danger">
                                            Have'nt uploaded any projects yet.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else if (!imageName && profession) {
        return (
            <>
                <NavbarU />
                <section className="h-100 gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-12">
                                <div className="card">
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 230 }}>
                                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                            <img src='/images/default_dp.png' alt='default' className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />
                                            <button onClick={EditPanel} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1, marginTop: '0.4in'  }}>
                                                Edit profile
                                            </button>
                                        </div>
                                        <div className="ms-3" style={{ marginTop: 130 }}>
                                            <h3>{name}</h3>
                                            <p>{profession}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                        <div className="d-flex justify-content-end text-center py-1">
                                            <div>
                                                <p className="mb-1 h5">{projects}</p>
                                                <p className="small text-muted mb-0">Projects</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black"><hr />
                                        <div className="mb-3">
                                            <p className="lead fw-bolder mb-1">Description</p>
                                            <p className="fst-italic mb-1">{description}</p><hr />
                                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/location-pin.png' alt='location' width={"20px"} height={"25px"} style={{ marginRight: '10px' }} />{countryName}</p>
                                                <p className="fw-bold mb-2 text-secondary"><img src='/images/email.png' alt='email' width={"22px"} height={"18px"} style={{ marginRight: '8px' }} />{email}</p>
                                                <p className="fw-bold mb-0 text-secondary"><img src='/images/phone-call.png' alt='phone' width={"21px"} height={"21px"} style={{ marginRight: '8px' }} />{phoneNum}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mb-4 text-danger">
                                            Have'nt uploaded any projects yet.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else {
        return (
            <>
                <NavbarU />
                <section className="gradient-custom-2">
                    <div className="p-5 text-center">
                        <h5>Loading...</h5>
                    </div>
                </section>
            </>
        )
    }
}

export default Profile