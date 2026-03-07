import React from 'react'
import { useUserContext } from '../context/ContextProvider'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Content1 = () => {

  const { Title, setTitle, Description, setDescription, Notes, setNotes } = useUserContext();

  const navigate = useNavigate();

  const notesHandler = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      const newNote = { title: Title, description: Description }
      const res = await axios.post("http://localhost:8000/api/notes", newNote, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Notes from server:", res);
      setNotes(prev => [...prev, res.data.notes]);
    } catch (error) {
      console.log("Axios error:", error.response?.data || error.message);
      navigate('/signin')
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .note-form-card {
          width: 100%;
          max-width: 360px;
          background: white;
          border-radius: 24px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow:
            0 4px 6px -1px rgba(0,0,0,0.04),
            0 20px 50px -8px rgba(0,0,0,0.1);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .note-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, #F59E0B, #FBBF24, #FCD34D);
          border-radius: 24px 24px 0 0;
        }

        .form-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding-bottom: 0.5rem;
        }

        .form-icon {
          width: 46px;
          height: 46px;
          background: #FEF3C7;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .form-title {
          font-family: 'Lora', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1C1917;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .form-subtitle {
          font-size: 0.78rem;
          color: #A8A29E;
          font-weight: 300;
          margin: 0;
          letter-spacing: 0.02em;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #78716C;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding-left: 2px;
        }

        .form-input, .form-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: #1C1917;
          background: #FAFAF8;
          border: 1.5px solid #E7E5E4;
          border-radius: 12px;
          padding: 11px 14px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: #C4BFB9;
          font-weight: 300;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #F59E0B;
          background: white;
          box-shadow: 0 0 0 4px rgba(245,158,11,0.1);
        }

        .form-textarea {
          resize: none;
          min-height: 130px;
          line-height: 1.65;
        }

        .submit-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 50px;
          background: linear-gradient(135deg, #F59E0B, #FBBF24);
          color: white;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(245,158,11,0.35);
          margin-top: 0.25rem;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(245,158,11,0.45);
          background: linear-gradient(135deg, #D97706, #F59E0B);
        }

        .submit-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 10px rgba(245,158,11,0.3);
        }

        @media (max-width: 768px) {
          .sidebar-panel {
            border-right: none;
            border-bottom: 1px solid rgba(0,0,0,0.06);
            padding: 1.5rem 1rem;
          }
        }
      `}</style>

      <div className="note-form-card">

          <div className="form-header">
            <div className="form-icon">📝</div>
            <h2 className="form-title">New Note</h2>
            <p className="form-subtitle">Capture your thoughts</p>
          </div>

          <div className="field-group">
            <label className="field-label">Title</label>
            <input
              type="text"
              placeholder="Give your note a title..."
              className="form-input"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Note</label>
            <textarea
              placeholder="Write your thoughts here..."
              className="form-textarea"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              notesHandler();
            }}
          >
            Create Note
          </button>

        </div>
    </>
  )
}

export default Content1