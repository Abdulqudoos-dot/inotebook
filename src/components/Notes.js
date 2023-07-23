import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Addnote from './Addnote'
import NoteContext from './context/NoteContext'
import NoteItem from './NoteItem'
const Notes = () => {
  const navigate = useNavigate()
  const context = useContext(NoteContext)
  const ref = useRef()
  const cRef = useRef()
  const [note, setNote] = useState({ id: '', etitle: '', edesc: "", etag: "" })

  const { notes, fechAllNotes, editNote } = context
  useEffect( () => {
    if (localStorage.getItem('token')) {
      fechAllNotes()
      // eslint-disable-next-line
    } else {
      navigate('/login')
    }
  }, []);// eslint-disable-next-line

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edesc: currentNote.desc, etag: currentNote.tag })

  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const submitHandlebar = (e) => {
    e.preventDefault()
    editNote(note.id, note.etitle, note.edesc, note.etag)
    cRef.current.click()
  }
  return (
    <>
      <Addnote />
      <button type="button" id='launch' ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitHandlebar}>
                <div className="mb-3 my-4" >
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' value={note.etitle} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edesc" aria-describedby="emailHelp" name='edesc' value={note.edesc} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" aria-describedby="emailHelp" name='etag' value={note.etag} onChange={onChange} required minLength={5} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" ref={cRef} data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Update note</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <h2 className='mx-3 my-3'>Your notes</h2>
        <div className='container mx-2'>
          {notes.length === 0 && 'Add some notes'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes
