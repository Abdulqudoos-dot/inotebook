import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [credential,setCredential] = useState({ email: "", password: "" })
    const loginHandle = async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/user/loginuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email:credential.email,
                password:credential.password
            })
          })
          const token = await response.json();
          console.log(token);
          if(token.success===true){
            localStorage.setItem('token',token.authtoken)
            navigate('/')
          }
    }
    const onChange = (e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <>
            <form className='my-5' onSubmit={loginHandle}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credential.email} onChange={onChange}  required minLength={5}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} required minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
export default Login
