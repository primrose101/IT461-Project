import { useRef, useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

import axios from 'axios';


const Login = () => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axios.post('http://127.0.0.1:8000/v1/auth/token',
            JSON.stringify({
                username: user,
                password: pwd
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        )
        .then(res => {
            console.log(res);
            console.log(res.data); // {token: 'eyJ0eX...'}
        });
    } 

    return (
        <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg">
            <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
          </Form.Group>
          <Form.Group size="lg">
            <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
          </Form.Group>
          <Button block="true" size="lg" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
}

export default Login