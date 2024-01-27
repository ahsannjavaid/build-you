import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardP = (props) => {

    const navigate = useNavigate()

    const SProject = (id,username) => {
        navigate(`/single-project-write/${username}/${id}`)
    }

    return (
        <button onClick={() => SProject(props._id, props.username)} className='btn btn-block'>
        <div className="card text-center" style={{ width: '18rem' }}>
            <img src={props.image} className="card-img-top card-v" alt="" />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p>{props.description}</p>
            </div>
        </div>
        </button>
    )
}

export default CardP