import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/helper'

const Card = (props) => {

    const navigate = useNavigate()

    const SProject = (id) => {
        navigate(`/single-project-read/${id}`)
    }

    return (
        <button onClick={() => SProject(props._id)} className='btn btn-block'>
            <div className="card text-center" style={{ width: '18rem' }}>
                <img src={`${BASE_URL}uploads/${props.image}`} className="card-img-top card-v" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <h6 style={{ color: '#E41221' }}><img className='me-2' src='/images/email.png' alt='' width={"18px"} height={"14px"} />{props.username}</h6>
                </div>
            </div>
        </button>
    )
}

export default Card