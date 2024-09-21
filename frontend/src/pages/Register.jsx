import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import AuthContext from '../context/AuthContext'
import { Navbar } from '../components/Navbar.jsx'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";


import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';



export const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [last_name, setLastName] = useState('');
    const [first_name, setFirstName] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setLastName('');
        setFirstName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await register(username, password, confirm_password, email, last_name, first_name);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }
    };



//   const {loginUser} = useContext(AuthContext)
//   const handleSubmit = e => {
//     e.preventDefault()
//     const email = e.target.email.value
//     const password = e.target.password.value

//     email.length > 0 && loginUser(email, password)

//     console.log(email)
//     console.log(password)
   
//   }

  return (
    <div  className="wallets">
        <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                    <div className="float-right my-2">
                        <Navbar />
                    </div>
                </div>
                <div className="card p-3">
                    <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="first_name">First Name</Label>
                        <Input
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            name="first_name"
                            id="first_name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="last_name">Last Name</Label>
                        <Input
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            name="last_name"
                            id="last_name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            id="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            name="username"
                            id="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                            name="password"
                            id="password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirm_password">Confirm Password</Label>
                        <Input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="text"
                            name="confirm_password"
                            id="confirm_password" />
                            <p>
                                {confirm_password !== password ? 'Passwords do not match' : ''}
                            </p>
                    </FormGroup>
                    <Button>Submit</Button>

                    </form>
                </div>
            </div>
        </div>
    </div>
                
    )    
}