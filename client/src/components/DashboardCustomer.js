import React, { useEffect, useState } from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import Aside from "./Aside";
import axios from "axios";
import { Form, Button, Container, Alert ,Modal} from 'react-bootstrap';

function DashboardCustomer () {

    

    const [data, setData] = useState({
        'next': null,
        'previous': null,
        'results':[]
    });

    const [url, setUrl] = useState('http://localhost:8000/customer/v1/customers');
    const getData = async (url, options) => {
        setUrl(url);
        try {
            const response = await axios.get(url, options);
            console.log(response.data);
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        getData(url, {
            signal: controller.signal,
        });
        return () => {
            controller.abort();
        }
    }, []);


    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [enteredId, setId] = useState('');
    const [enteredName, setName] = useState('');
    const [enteredRole, setRole] = useState('');
  
  
    const IdChangeHandler = (event) => {
      setId(event.target.value);
    };
  
    const nameChangeHandler = (event) => {
      setName(event.target.value);
    };
  
    const roleChangeHandler = (event) => {
      setRole(event.target.value);
    };
  
  
    const submitHandler = (event) => {
      event.preventDefault();
  
      //reset the values of input fields
          setId('');
          setName('');
          setRole('');
  
      return alert('Entered Values are: '+enteredId+','+ enteredName +','+enteredRole)
  
  
    };



  
    return (
        <div className="row">
            <div className="col-3">
                <Aside active={"customers"}/>
            </div>
            <div className="col-9">
                <h2>Dashboard Customer</h2>
                <table class="table table-bordered table-hover">
                    <thead class="bg-primary text-white">
                        <tr>
                            <th>ID</th>
                            <th>Date Registered</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        { data['results'].map((d) => (
                            <tr>
                                <td>{ d['id'] }</td>
                                <td>{ d['dateregistered'] }</td>
                                <td>{ d['firstname'] }</td>
                                <td>{ d['lastname'] }</td>
                                <td>{ d['email'] }</td>
                                <td>{ d['contact'] }</td>
                                <td>
                                    <button className="btn btn-warning btn-sm">Edit</button>
                                    <span> </span>
                                    <button className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table> 

                <div align="right">
                    { data['previous']!==null && <a className="btn btn-link" href={ data['previous'] }>Previous</a> }
                    { data['next']!==null && <a className="btn btn-link" href={ data['next'] }>Next</a> }
                </div>

                <button class="btn btn-primary"  onClick={handleShow} >Add Customer</button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <Alert variant='primary'>
                    <Container>
                    <Form onSubmit={submitHandler}>
                    <Form.Group  controlId="form.id">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="number" value={enteredId} onChange={IdChangeHandler}placeholder="Enter Id" required/>
                        </Form.Group>
                        <Form.Group controlId="form.Name">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" value={enteredName} onChange={nameChangeHandler} placeholder="Enter User Name" required/>
                        </Form.Group>
                        <Form.Group  controlId="form.Role">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={enteredRole} onChange={roleChangeHandler} placeholder="Enter Role" required/>
                        </Form.Group>
                        <Button type='submit'>Add Employee</Button>
                    </Form>
                    </Container>
                    </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
                    </Modal>
                        
            </div>
        </div>
    
    );
}

export default DashboardCustomer;