import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { BASE_URL } from '../services/helper'

const SingleProjectR = () => {

    const navigate = useNavigate()

    const {id} = useParams()
    
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
    }, [])

    if (projects) {
        
        for (let i = 0; i < projects.length; i++) {
            if (projects[i]._id === id) {
                duplicateArray = { ...projects[i] }
            }
        }
    }

    const ShowOwner = () => {
        navigate(`/show-owner/${duplicateArray.username}`)
    }

    if (projects) {
        return (
            <div>
                <Navbar />
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
                                                    <div className="d-flex align-items-center pb-1">
                                                        <img src='/images/logo0.0.png' alt='logo' width={"100px"} height={"26px"} />
                                                    </div>
                                                    <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: 1 }}>Project Info</h5>
                                                    <div className='form-outline mb-3'>
                                                        <label className="form-label" htmlFor="fname">Project Name</label>
                                                        <input readOnly defaultValue={duplicateArray.projectName} type="text" id="fname" className="form-control form-control-lg" />
                                                    </div>
                                                    <div className='row mb-3'>
                                                        <div className='col'>
                                                            <label className="form-label" htmlFor="form2Example17">Tag</label>
                                                            <input readOnly defaultValue={duplicateArray.projectTag} type="text" id="form2Example17" className="form-control form-control" />
                                                        </div>
                                                        <div className='col'>
                                                            <label className="form-label" htmlFor="form2Example27">Tool(s)</label>
                                                            <input readOnly defaultValue={duplicateArray.projectTool} type="text" id="form2Example27" className="form-control form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="form-outline mb-3">
                                                        <label className="form-label" htmlFor="form2Example27">Link</label>
                                                        <input readOnly defaultValue={duplicateArray.projectLink} type="text" id="form2Example27" className="form-control form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                                        <textarea readOnly defaultValue={duplicateArray.projectDescription} className="form-control" id="exampleFormControlTextarea1" rows={3} />
                                                    </div>
                                                    <div className="pt-1">
                                                        <button onClick={ShowOwner} className="btn btn-lg btn-dark btn-block" type="button">Show Owner</button>
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

export default SingleProjectR