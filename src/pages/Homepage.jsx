import React, { useEffect, useState } from 'react'
import Content1 from '../components/Content1'
import Content2 from '../components/Content2'
import { useUserContext } from '../context/ContextProvider'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
const Homepage = () => {
   const {setNotes} = useUserContext();
   const navigate = useNavigate();
   const fetchNotes = async () => {
     try {
        const token = localStorage.getItem("accessToken");
        console.log(token)
        const notes = await axios.get("http://localhost:8000/api/notes",{
           headers: {
            Authorization : `Bearer ${token}`
           }
        })

        console.log(notes);
        setNotes(notes.data)
     } catch (error) {
        if(error.response && error.response.status === 403){
           localStorage.removeItem("accessToken")
           navigate('/signin')
        }
        console.log("something went wrong", error.response);
     }
   }

   useEffect(()=>{
      fetchNotes()
   },[]);
  return (
    <div className='h-screen'>
        <div className='h-min-screen w-full flex'>
           <Content1/>
           <Content2/>
        </div>
    </div>
  )
}

export default Homepage