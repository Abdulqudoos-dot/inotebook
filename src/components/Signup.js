import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate =useNavigate()
    const [credential, setCredential] = useState({ name: "", email: "", password: "" })



    const signupHandle = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/user/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                name:credential.name,
                email:credential.email,
                password:credential.password
            })
          })
          const token = await response.json();
          if(token.success===true){
            navigate('/login')
          }
        }
    const onChange = (e) => {
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <>
            <form className='my-5' onSubmit={signupHandle}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credential.name}  required minLength={5} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" required minLength={5} value={credential.email} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} required minLength={5} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Signup
