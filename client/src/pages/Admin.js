import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { BASE_URL } from '../services/helper'

const Admin = () => {
console.log("Admin")
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

    return (
        <>
            <Navbar />
            <h3 className='text-center fw-bolder mt-4' style={{color: '#E41221', letterSpacing: '3px', textDecoration: 'underline'}}>USERS</h3>
            <div className='container mt-5 mb-5'>
                <table className="table table-striped">
                    <thead>
                        <tr style={{ color: '#E41221' }}>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((x, ind) =>
                                <tr key={ind}>
                                    <th scope="row" style={{ color: '#E41221' }}>{++ind}</th>
                                    <td>{x.fname} {x.lname}</td>
                                    <td>{x.username}</td>
                                    <td>{x.password}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Admin