import React from "react";
import axios from 'axios';
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { useState } from "react";
import { useEffect } from "react";


const EditProfile = () => {
  const user = useSelector(store => store.user)
  const [ firstName , setFirstName] = useState(user?.firstName);
  const [ lastName , setLastName] = useState(user?.lastName);
  const [ photoUrl , setPhotoUrl] = useState(user?.photoUrl);
  const [ age , setAge] = useState(user?.age || 10);
  const [ gender, setGender] = useState( user?.gender);
  const [ about , setAbout] = useState(user?.about);
  const [error , setError] = useState("");
  const [toast , setToast] = useState(false);
  const dispatch = useDispatch();

  const profileSave = async () => {
    setError("")
    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        {
            firstName , lastName , photoUrl , age , gender , about 
        }, {withCredentials : true}
      );
      dispatch( addUser(res.data.data) );
      localStorage.setItem("user", JSON.stringify(res.data.data));   // adding in local storage
      setToast(true)
      setTimeout(()=>{
        setToast(false)
      },2000)
    } catch (err) {
      setError(err.response.data)
      console.error(err)
    }
  };

  // 👇 this runs when Redux store gets the user
useEffect(() => {
    user && localStorage.setItem("user", JSON.stringify(user)); 
    const storagefromLocal = JSON.parse(localStorage.getItem("user"))
    if (storagefromLocal) {
      setFirstName(storagefromLocal.firstName);
      setLastName(storagefromLocal.lastName);
      setPhotoUrl(storagefromLocal.photoUrl);
      setAge(storagefromLocal.age);
      setGender(storagefromLocal.gender);
      setAbout(storagefromLocal.about);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center my-15">
        <div className="card card-side bg-base-200 shadow-sm  w-100 h-auto mx-15">
          <div className="card-body">
            <h2 className="card-title flex justify-center text-[26px]">
              Edit profile
            </h2>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">FirstName</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">LastName</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">PhotoUrl</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select className="select"  onChange={(e) => setGender(e.target.value)}>
                <option disabled={true}>Choose gender</option>
                <option>male</option>
                <option>female</option>
                <option>other</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center my-5">
              <button className="btn bg-base-300 w-45" onClick={profileSave}>
                Save profile
              </button>
            </div>
          </div>
        </div>

        {user && (
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        )}
      </div>
      {toast && (
        <div className="toast toast-top toast-center mt-10">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
