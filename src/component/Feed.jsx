import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      navigate("/login")
    }
  };

  useEffect( ()=>{
    getFeed()
  } ,[])

  return (
    <>
      
      { (feed && feed.length !== 0) ? <UserCard user={feed[0]}/>: <h3 className="text-center my-7"> You dont have users to swipe</h3>}
    </>
  );
};

export default Feed;
