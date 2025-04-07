import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import BASE_URL from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { emptyFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((data) => data.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogout = async ()=>{
          try{
             await axios.post(BASE_URL + "/logout" , {} , { withCredentials : true});
             dispatch(removeUser())
             dispatch(emptyFeed())
             localStorage.removeItem("user")
             navigate("/login")
          }catch(err){

          }
 }

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <h1>Welcome {user.firstName}</h1>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-5"
            >
              <div className="w-10 rounded-full">
                <img alt="This is user" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Request
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;