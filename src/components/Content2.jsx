import React, { useState } from 'react'
import { useUserContext } from '../context/ContextProvider'
import axios from 'axios'

const Content2 = () => {

  const { Notes, setNotes } = useUserContext()

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  const deleteTheNote = async (id) => {
    try {
      const token = localStorage.getItem("accessToken")
      await axios.delete(`http://localhost:8000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(prev => prev.filter(note => note._id !== id))
    } catch (error) {
      console.log(error.response)
    }
  }

  const startEdit = (note) => {
    setEditingId(note._id)
    setEditTitle(note.title)
    setEditDescription(note.description)
  }

  const updateNote = async (id) => {
    try {
      const token = localStorage.getItem("accessToken")
      await axios.put(
        `http://localhost:8000/api/notes/${id}`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNotes(prev =>
        prev.map(note =>
          note._id === id
            ? { ...note, title: editTitle, description: editDescription }
            : note
        )
      )
      setEditingId(null)
    } catch (error) {
      console.log(error.response)
    }
  }

  const cardColors = [
    { bg: '#FFFBF0', accent: '#F59E0B', tag: '#FEF3C7', tagText: '#92400E' },
    { bg: '#F0FDF4', accent: '#10B981', tag: '#D1FAE5', tagText: '#065F46' },
    { bg: '#EFF6FF', accent: '#3B82F6', tag: '#DBEAFE', tagText: '#1E40AF' },
    { bg: '#FDF4FF', accent: '#A855F7', tag: '#F3E8FF', tagText: '#6B21A8' },
    { bg: '#FFF1F2', accent: '#F43F5E', tag: '#FFE4E6', tagText: '#9F1239' },
    { bg: '#F0FDFA', accent: '#14B8A6', tag: '#CCFBF1', tagText: '#134E4A' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .notes-grid {
          width: 100%;
          padding: 2rem 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.5rem;
          align-items: start;
        }

        .note-card {
          border-radius: 20px;
          padding: 1.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 30px -5px rgba(0,0,0,0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        .note-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 20px 20px 0 0;
          opacity: 0.7;
        }

        .note-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px -2px rgba(0,0,0,0.08), 0 20px 50px -8px rgba(0,0,0,0.12);
        }

        .note-actions {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          gap: 6px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .note-card:hover .note-actions {
          opacity: 1;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .edit-btn {
          background: rgba(255,255,255,0.85);
          color: #3B82F6;
          box-shadow: 0 2px 8px rgba(59,130,246,0.2);
        }
        .edit-btn:hover {
          background: #3B82F6;
          color: white;
          transform: scale(1.1);
        }

        .delete-btn {
          background: rgba(255,255,255,0.85);
          color: #F43F5E;
          box-shadow: 0 2px 8px rgba(244,63,94,0.2);
        }
        .delete-btn:hover {
          background: #F43F5E;
          color: white;
          transform: scale(1.1);
        }

        .note-index {
          font-family: 'Lora', serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          width: fit-content;
        }

        .note-title {
          font-family: 'Lora', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1C1917;
          line-height: 1.35;
          margin: 0;
          padding-right: 60px;
        }

        .note-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(0,0,0,0.1), transparent);
          border: none;
          margin: 0;
        }

        .note-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #57534E;
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
        }

        /* Edit mode styles */
        .edit-input {
          font-family: 'Lora', serif;
          font-size: 1rem;
          font-weight: 600;
          border: 2px solid transparent;
          border-radius: 10px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.7);
          outline: none;
          width: 100%;
          color: #1C1917;
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }

        .edit-input:focus {
          background: white;
          border-color: rgba(0,0,0,0.15);
          box-shadow: 0 0 0 4px rgba(0,0,0,0.04);
        }

        .edit-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          border: 2px solid transparent;
          border-radius: 10px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.7);
          outline: none;
          width: 100%;
          color: #57534E;
          resize: none;
          min-height: 90px;
          line-height: 1.65;
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }

        .edit-textarea:focus {
          background: white;
          border-color: rgba(0,0,0,0.15);
          box-shadow: 0 0 0 4px rgba(0,0,0,0.04);
        }

        .save-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 10px 20px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          color: white;
          align-self: flex-end;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .save-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }

        .save-btn:active {
          transform: translateY(0);
        }

        .notes-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .notes-header {
          padding: 2.5rem 2rem 0rem 2rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
        }

        .notes-header-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .notes-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F59E0B;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .notes-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 2px;
          background: #F59E0B;
          border-radius: 2px;
        }

        .notes-heading {
          font-family: 'Lora', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #1C1917;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .notes-heading span {
          font-style: italic;
          color: #F59E0B;
        }

        .notes-count-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: #78716C;
          background: white;
          border: 1px solid #E7E5E4;
          border-radius: 50px;
          padding: 6px 16px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          margin-bottom: 6px;
        }

        .notes-header-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(0,0,0,0.08), transparent);
          border: none;
          margin: 1.25rem 2rem 0;
        }

        @media (max-width: 768px) {
          .note-actions {
            opacity: 1;
          }
          .notes-grid {
            grid-template-columns: 1fr;
          }
          .notes-heading {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <div className="notes-wrapper">

        {/* Header */}
        <div className="notes-header">
          <div className="notes-header-left">
            <span className="notes-eyebrow">My Collection</span>
            <h1 className="notes-heading">Your <span>Notes</span></h1>
          </div>
          <div className="notes-count-badge">
            {Notes.length} {Notes.length === 1 ? 'note' : 'notes'}
          </div>
        </div>

        <hr className="notes-header-divider" />

      <div className="notes-grid">
        {Notes.map((value, index) => {
          const color = cardColors[index % cardColors.length]
          const noteNumber = String(index + 1).padStart(2, '0')

          return (
            <div
              key={value._id}
              className="note-card"
              style={{
                background: color.bg,
                '--accent': color.accent,
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: color.accent, borderRadius: '20px 20px 0 0'
              }} />

              {/* Action Buttons */}
              <div className="note-actions">
                <button className="action-btn edit-btn" onClick={() => startEdit(value)} title="Edit">
                  ✏️
                </button>
                <button className="action-btn delete-btn" onClick={() => deleteTheNote(value._id)} title="Delete">
                  🗑
                </button>
              </div>

              {/* Note Number Tag */}
              <span
                className="note-index"
                style={{ background: color.tag, color: color.tagText }}
              >
                Note {noteNumber}
              </span>

              {editingId === value._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-input"
                    placeholder="Note title..."
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="edit-textarea"
                    placeholder="Write your note..."
                  />
                  <button
                    className="save-btn"
                    style={{ background: color.accent }}
                    onClick={() => updateNote(value._id)}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <h3 className="note-title">{value.title}</h3>
                  <hr className="note-divider" />
                  <p className="note-description">{value.description}</p>
                </>
              )}
            </div>
          )
        })}
      </div>
      </div>
    </>
  )
}

export default Content2