import React, { useState } from "react";
import axios from 'axios';
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import BASE_URL from "../utils/constant";


const Login = () => {

  const [ emailId , setEmailId] = useState("pravin@gmail.com");
  const [ password , setPassword] = useState("Pravin123#");
  const [ firstName , setfirstName] = useState("");
  const [ lastName , setLastName] = useState("");
  const [error , setError] = useState("");
  const [ isLogIn , setIsLogIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch( addUser(res.data) );
      navigate("/feed");
    
    } catch (err) {
      setError("Invalid creditials!!")
      console.error(err);
    }
  };

  
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch( addUser(res.data.data) );
      navigate("/profile");
    
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Inputs, Please check!");
    }
  };

  const changeLogIn = ()=>{
        setIsLogIn( (value) => !value)
  }

  return (
    <>
      <div className="flex justify-center my-15">
        <div className="card card-side bg-base-200 shadow-sm w-lg h-auto">
          <figure className="w-50">
            <img
              src="https://imageio.forbes.com/specials-images/imageserve/66269752b02ac3d3a4b80bd0/0x0.jpg?format=jpg&crop=2423,1362,x12,y158,safe&height=900&width=1600&fit=bounds"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title flex justify-center text-[26px]">
              {isLogIn ? "Log In" : "Sign up"}
            </h2>

            {!isLogIn && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name*</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name*</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id*</legend>
              <input
                type="text"
                className="input"
                placeholder="xyz@gmail.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password*</legend>
              <input
                type="text"
                className="input"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center my-5">
              <button className="btn bg-base-300 w-25" onClick={isLogIn ? handleLogIn : handleSignUp}>
                Submit
              </button>
            </div>
            <p
              className="my-6 text-center cursor-pointer"
              onClick={() => changeLogIn()}
            >
              {isLogIn ? "New user? Sign up" : "Already a user ? Log In"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
