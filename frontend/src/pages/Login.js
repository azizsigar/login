import React from 'react'
import { GoogleLogin } from "react-google-login";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const clientId = " 197874831810-6p0adn9nd4ed6bpqc3nheqokop5usnkr.apps.googleusercontent.com"
function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  useEffect(() => {
    fetchUsers()
  }, [])
  const fetchUsers = () => {
    axios
      .get('http://localhost:3001/register')
      .then((res) => {
        console.log(res.data)
      })
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3001/login', { username, password })
      const token = res.data.token
      setUsername('')
      setpassword('')
      fetchUsers()
      await toast.success('Successfully login!');
      localStorage.setItem('token', token)
      await navigate('/account');
      window.location.reload()
    } catch (error) {
      console.log('Error logging in:', error)
    }
  }
  const responseGoogle = (response: any) => {
    console.log(response.accessToken);
  };
  return (
    <div >
      < >
        <button onClick={handleShow}>Log in</button>
        <Toaster position="top-center" reverseOrder={false} />

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}

        >
          <Modal.Header closeButton >
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id='signupmodal' onSubmit={handleLogin} >
              <input
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </form>
            
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button type='submit' form='signupmodal'>Log in</button>
            <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}

      />
          </Modal.Footer>
        </Modal>
      </>
      
    </div>
  );
}
export default Login;