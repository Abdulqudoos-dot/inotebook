import React, { useContext, useState } from 'react'
import NoteContext from './context/NoteContext'

const Addnote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", desc: "", tag: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const submitHandlebar = (e) => {
        e.preventDefault();
        addNote(note.title, note.desc, note.tag)
        setNote({ title: "", desc: "", tag: "" })
    }

    return (
        <>
            <h1 className='my-3'>Add some catchy notes </h1>
            <form onSubmit={submitHandlebar}>
                <div className="mb-3 my-4" >
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' value={note.title} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" aria-describedby="emailHelp" name='desc' value={note.desc} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" aria-describedby="emailHelp" name='tag' value={note.tag} onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Add note</button>
            </form>
        </>
    )
}

export default Addnote
