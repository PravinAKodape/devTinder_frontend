import React  , { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import BASE_URL from '../utils/constant'
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async()=>{
      try{
          
          const res = await axios.get(BASE_URL + "/profile/view" , {withCredentials : true});
          dispatch(addUser(res.data))

      }catch(err){
          
          if(err.status === 401){
            navigate("/login")
          }

        console.log(err.message)
      }
  }

  useEffect(()=>{
    fetchUser();
  } , [])
  return (
    <div className='min-h-screen flex flex-col'>
        <NavBar/>
        <div className='flex-grow'> <Outlet/> </div>
        <Footer/>
    </div>
  )
}

export default Body