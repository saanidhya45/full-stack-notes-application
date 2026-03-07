import React, { useEffect } from 'react'
import Content1 from '../components/Content1'
import Content2 from '../components/Content2'
import { useUserContext } from '../context/ContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const { setNotes } = useUserContext();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token)
      const notes = await axios.get("http://localhost:8000/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(notes);
      setNotes(notes.data)
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("accessToken")
        navigate('/signin')
      }
      console.log("something went wrong", error.response);
    }
  }

  useEffect(() => {
    fetchNotes()
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#FAFAF8' }}>

      {/* Left Sidebar — fixed width, full height, scrollable */}
      <div style={{
        width: '340px',
        minWidth: '340px',
        height: '100vh',
        overflowY: 'auto',
        borderRight: '1px solid rgba(0,0,0,0.07)',
        background: '#FAFAF8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.25rem',
        boxSizing: 'border-box',
      }}>
        <Content1 />
      </div>

      {/* Right Content — fills remaining space, scrollable */}
      <div style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        background: '#F5F4F0',
      }}>
        <Content2 />
      </div>

    </div>
  )
}

export default Homepage
