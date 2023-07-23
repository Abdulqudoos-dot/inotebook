import React, { useState } from 'react'
import UserContext from './userContext'

const UserState = (props) => {
  const userInitial = []
  const [user, setUser] = useState(userInitial)
  const fechUser = async () => {
    const response = await fetch(`http://localhost:5000/user/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const user = await response.json();

      console.log(user)
      setUser(user)
  }
  return (
    <UserContext.Provider value={{ fechUser,user }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState