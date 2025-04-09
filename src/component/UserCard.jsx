import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";
import BASE_URL from "../utils/constant";

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const { _id, firstName , lastName , photoUrl , about , age , gender} = user;

  const respondFeed = async (status, toUserID) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + toUserID, {} ,
      {
        withCredentials: true,
      }
    );
    dispatch(removeFromFeed(toUserID))
  };

  return (
    <> 
       <div className="flex justify-center my-15">
      <div className="card bg-base-100 w-90 shadow-sm h-105">
        <figure>
          <img src={photoUrl} alt="user" className="h-60 w-90 fill-teal-100" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + "  " + lastName}</h2>
          <p>{about}</p>
          {age && gender && <p>{age + " , " + gender} </p>}
          <div className="card-actions justify-center my-5">
            <button
              className="btn btn-primary"
              onClick={() => respondFeed("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => respondFeed("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default UserCard;
