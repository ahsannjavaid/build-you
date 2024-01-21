import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarU from '../components/NavbarU'
import { BASE_URL } from '../services/config'

const SingleProjectW = () => {

    const navigate = useNavigate()

    const id = useParams().id
    const username = useParams().username

    let duplicateArray = []

    const [projects, setProjects] = useState()

    const getProjects = async () => {
        let result = await fetch(`${BASE_URL}projects-details`)
        if (result) {
            result = await result.json()
            setProjects(result)
        }
        else {
            console.log("Projects not found!")
        }
    }

    useEffect(() => {
        getProjects()
    }, []);

    if (projects) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i]._id === id) {
                duplicateArray = { ...projects[i] }
            }
        }
    }

    const DeleteProject = () => {
        let views = 0, likes = 0
        var fd = new FormData()
        fd.append("username", username)
        fd.append("likes", likes)
        fd.append("views", views)
        fetch(`${BASE_URL}project-details/${id}`, {
            method: 'delete',
        })
        fetch(`${BASE_URL}profile-decrement`, {
            method: 'put',
            body: fd
        }).then((res) => {
            res.json().then((data) => {
                console.log(data, "Update API")
            })
        })
        alert("Successfully deleted!")
        navigate(`/profile/${username}`)
    }

    if (projects) {
        return (
            <div>
                <NavbarU />
                <section className="gradient-custom-2">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col col-xl-10">
                                <div className="card mt-4 mb-4" style={{ borderRadius: '1rem' }}>
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-5 d-md-block">
                                            <img src={`${BASE_URL}uploads/${duplicateArray.projectImage}`} alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                        </div>
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5">
                                                <form>
                                                    <div className='form-outline mb-3'>
                                                        <label className="form-label" htmlFor="fname">Project Name</label>
                                                        <input readOnly defaultValue={duplicateArray.projectName} type="text" id="fname" className="form-control form-control-lg" />
                                                    </div>
                                                    <div className='row mb-3'>
                                                        <div className='col'>
                                                            <label className="form-label" htmlFor="form2Example17">Tag</label>
                                                            <input readOnly defaultValue={duplicateArray.projectTag} type="text" id="form2Example17" className="form-control form-control-lg" />
                                                        </div>
                                                        <div className='col'>
                                                            <label className="form-label" htmlFor="form2Example27">Tool(s)</label>
                                                            <input readOnly defaultValue={duplicateArray.projectTool} type="text" id="form2Example27" className="form-control form-control-lg" />
                                                        </div>
                                                    </div>
                                                    <div className="form-outline mb-3">
                                                        <label className="form-label" htmlFor="form2Example27">Link</label>
                                                        <input readOnly defaultValue={duplicateArray.projectLink} type="text" id="form2Example27" className="form-control form-control-lg" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                                        <textarea readOnly defaultValue={duplicateArray.projectDescription} className="form-control" id="exampleFormControlTextarea1" rows={3} />
                                                    </div>
                                                    <div className="pt-1">
                                                        <button onClick={DeleteProject} className="btn btn-lg btn-dark btn-block" type="button">Delete</button>
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

    else {
        return (
            <h4 className='text-center text-danger'>Loading...</h4>
        )
    }
}

export default SingleProjectW