import React, { useState } from 'react'
import NoteContext from './NoteContext'
const hostname = 'http://localhost:5000/note'

const NoteState = (props) => {
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial)
  const fechAllNotes = async () => {
    const response = await fetch(`${hostname}/fechallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json();
    let notes = json.notes

    setNotes(notes)
  }
  const addNote = async (title, desc, tag) => {
    const response = await fetch(`${hostname}/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desc, tag })
    })
    const json = await response.json();
    let note = json.note
    console.log(note);

    setNotes(notes.concat(note))
  }
  const deleteNote = async (id) => {
    const response = await fetch(`${hostname}/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json();
    let note = json.note
    console.log(note);

    const newNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNote)
  }

  const editNote = async (id, title, desc, tag) => {
    const response = await fetch(`${hostname}/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desc, tag })
    })
    const json = await response.json();
    let note = json.note
    const newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      

      if (element._id === id) {
        element._id = id
        element.title = title
        element.desc = desc
        element.tag = tag
        console.log(newNote);
        break;
      }
    }
    setNotes(newNote)


  }
  return (
    <NoteContext.Provider value={{ notes, addNote, fechAllNotes, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
