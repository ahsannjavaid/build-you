import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import Navbar from '../../components/Navbar'
import { BASE_URL } from '../../services/config'

const ShowOwner = () => {

    let duplicateArray = []

    let localUsername = useParams().username

    let imageName = "", profession = "", description = "", phoneNum = "", email = "", name = "", countryName = "", projects = 0, a = 0

    let [projectsP, setProjectsP] = useState([])
    let [profiles, setProfiles] = useState([])
    let [users, setUsers] = useState([])

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

    useEffect(() => {
        getProjects()
        getProfiles()
        getUsers()
    }, [])

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === localUsername) {
            name = users[i].fname + " " + users[i].lname
        }
    }

    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].username === localUsername) {
            imageName = profiles[i].profileImage
            phoneNum = profiles[i].phoneNum
            email = profiles[i].email
            countryName = profiles[i].countryName
            profession = profiles[i].profession
            description = profiles[i].description
            projects = profiles[i].projects
        }
    }

    if (projectsP) {
        for (let i = 0; i < projectsP.length; i++) {
            if (projectsP[i].username === localUsername) {
                duplicateArray[a++] = { ...projectsP[i] }
            }
        }
    }

    if (imageName) {
        return (
            <div>
                <Navbar />
                <section className="h-100 gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-12">
                                <div className="card">
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 230 }}>
                                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                            <img src={`${BASE_URL}uploads/${imageName}`} alt="profile" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />
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
                                                        <Card
                                                            _id={x._id}
                                                            name={x.projectName}
                                                            image={x.projectImage}
                                                            username={x.username} />
                                                    </div>)
                                            }
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

    else if (!imageName) {
        return (
            <>
                <Navbar />
                <section className="h-100 gradient-custom-2">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-12">
                                <div className="card">
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 230 }}>
                                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                            <img src='/images/default_dp.png' alt='default' className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />
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
                                                        <Card
                                                            name={x.projectName}
                                                            image={x.projectImage}
                                                            username={x.username} />
                                                    </div>
                                                )
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

    else {
        return (
            <>
                <h4 className='text-center text-danger'>Loading...</h4>
            </>
        )
    }
}

export default ShowOwner