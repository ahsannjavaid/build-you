import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={
        props.isReadable
          ? () => navigate(`/single-project-read/${props.id}`)
          : () => navigate(`/single-project-write/${props.username}/${props.id}`)
      }
      className="btn btn-block"
    >
      <div className="card text-center" style={{ width: "18rem" }}>
        <img src={props.image} className="card-img-top card-v" alt="" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          {props.isReadable ? (
            <h6 style={{ color: "#E41221" }}>
              <img
                className="me-2"
                src="/images/email.png"
                alt=""
                width={"18px"}
                height={"14px"}
              />
              {props.username}
            </h6>
          ) : (
            <p>{props.description}</p>
          )}
        </div>
      </div>
    </button>
  );
};

export default Card;
