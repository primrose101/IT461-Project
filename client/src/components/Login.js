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
    }

    return (
        <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
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
          <Form.Group size="lg" controlId="password">
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