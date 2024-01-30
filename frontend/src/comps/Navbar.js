import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import SignUpModal from './SignUpModal';
import Login  from "../pages/Login";

function Navbar() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate()
  const handeSignetOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='Navbar'>
      {isUserSignedIn ? (
        <>
          <Link to='/'>Homo Page</Link>
          <Link to='/account'>account</Link>
          <button onClick={handeSignetOut}>sing out</button>
        </>
      ) : (<>
        <Link to='/'>Homo Page</Link>
        <Login/>
        <SignUpModal />

      </>)}

    </div>
  )
}

export default Navbar