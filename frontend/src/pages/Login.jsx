import React, { useEffect, useState } from 'react'
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Navbar } from '../components/Navbar.jsx'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";


export const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await login(email, password);
        if (error) {
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
    };

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
                <Form onSubmit={handleLogin}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
                
    )    
}