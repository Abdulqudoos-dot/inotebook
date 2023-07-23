import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from './context/userContext'

const Navbar = () => {
    
    const Context = useContext(UserContext)
    const { fechUser, user } = Context
    useEffect(() => {
        localStorage.getItem('token') && fechUser()
    }, [])
    const navigate = useNavigate()
    const logoutHandle = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">INotebook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/about">About <span className="sr-only"></span></Link>
                        </li>
                    </ul>
                    {localStorage.getItem('token') && <button className='btn btn-primary mx-4'>{user.email}</button>}
                    {!localStorage.getItem('token') ? <form className="form-inline my-2 my-lg-0">
                        <Link className="btn btn-primary mx-3" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
                    </form> : <button onClick={logoutHandle} className='btn btn-primary'>Logout</button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
