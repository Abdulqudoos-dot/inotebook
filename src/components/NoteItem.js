import React, { useContext } from 'react'
import NoteContext from './context/NoteContext'
// import { Link } from 'react-router-dom'

const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const {deleteNote} = context
  const { note, updateNote} = props
  return (
    <>
      <div className='col-md-3'>
        <div className="card my-3">
          <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.desc}</p>
            <h5 className="card-title">{note.tag}</h5>
          <div className="d-flex align-items-center">
              <i className="fa-solid fa-trash mx-5" onClick={()=>{
                deleteNote(note._id)
              }}></i>
              <i className="fa-solid fa-file-pen mx-5" onClick={()=>{
                updateNote(note)
              }}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoteItem
