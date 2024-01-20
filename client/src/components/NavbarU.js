import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../services/helper'

const NavbarU = () => {

    let buildCheck = true
    const localUsername = useParams().username

    const [profiles, setProfiles] = useState([])

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

    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].username === localUsername) {
            buildCheck = false
        }
    }

    if (buildCheck) {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className='container'>
                    <Link to={"/"}>
                        <img src='/images/logo0.0.png' alt='logo' height='26px' width='100px' />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-item nav-link" to={`/user-home/${localUsername}`}>PROFILE</Link>
                            <Link className="nav-item nav-link" to={`/post-project/${localUsername}`}>POST PROJECT</Link>
                            <Link className="nav-item nav-link" to={"/login"}>LOGOUT</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
    }
    else {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <div className='container'>
                        <Link to={"/"}>
                            <img src='/images/logo0.0.png' alt='logo' height='26px' width='100px' />
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ms-auto">
                                <Link className="nav-item nav-link" to={`/profile/${localUsername}`}>PROFILE</Link>
                                <Link className="nav-item nav-link" to={`/post-project/${localUsername}`}>POST PROJECT</Link>
                                <Link className="nav-item nav-link" to={"/login"}>LOGOUT</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavbarU