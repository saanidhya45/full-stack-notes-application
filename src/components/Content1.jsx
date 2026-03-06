import React from 'react'
import { useUserContext } from '../context/ContextProvider'
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

const Content1 = () => {
    
   
   const {Title,setTitle, Description,setDescription, Notes, setNotes} = useUserContext();
  
   const navigate = useNavigate();

   // create a notes object that has to be stored in db
  //  const notes = {title: Title, description: Description}
const notesHandler = async () => {
  try { 
    const token = localStorage.getItem("accessToken"); // make sure token exists
    console.log(token);
    const newNote = {title : Title, description: Description}
    const res = await axios.post("http://localhost:8000/api/notes", newNote, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Notes from server:", res);

    // Update state with new note
    // const temp = [...Notes];
    // temp.push({ id: Date.now(), title: Title, description: Description });
    setNotes(prev => [...prev, res.data.notes]);


  } catch (error) {
    console.log("Axios error:", error.response?.data || error.message);
    navigate('/signin')
  }
};

  return (
    <div className="w-full md:w-1/3 h-full bg-gray-100 p-6 flex items-center justify-center">
      <form className="w-full bg-white shadow-lg rounded-2xl p-6 space-y-4">
        
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Add Note
        </h2>

        <input
          onChange={(e)=>{
              setTitle(e.target.value);
            }}
            value={Title}
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <textarea
          onChange={(e)=>{
              setDescription(e.target.value);
            }}
            value={Description}
          placeholder="Write your note..."
          rows="5"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
        ></textarea>

        <button
            onClick={(e)=>{
                e.preventDefault();
                notesHandler()
            }}
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
        >
          create note
        </button>

      </form>
    </div>
  )
}

export default Content1