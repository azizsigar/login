import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from "react-router-dom";
import axios from 'axios'; 
import { toast,Toaster } from 'react-hot-toast';

function SignUpModal() {
    const [user, setUser] = useState([])
    const [email, setEmail] = useState('')
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
    const handleRegister = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:3001/register', { email, username, password })
            .then(() => {
                setEmail('')
                setUsername('')
                setpassword('')
                fetchUsers()
                toast.success('Successfully toasted!');
                Navigate('/login')
            }).catch((err) => {
                console.log('unable to user register')
            });
    }

    return (
        < >
            <button onClick={handleShow}>Sign Up</button>
            <Toaster position="top-center" reverseOrder={false} />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton >
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='signupmodal' onSubmit={handleRegister}>
                        <input
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

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
                    <button type='submit' form='signupmodal'>sing up</button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SignUpModal;
