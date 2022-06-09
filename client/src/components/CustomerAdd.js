import React, { useEffect, useState } from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import Aside from "./Aside";
import axios from "axios";
import axiosInstance from "axios";
import { Form, Button, Container, Alert ,Modal} from 'react-bootstrap';
import moment from "moment";

function CustomerAdd () {


    const [data, setData] = useState({

      "id": "",
      "firstname": "",
      "lastname": "",
      "dateregistered": "",
      "address": "",
      "birthdate": "",
      "birthplace": "",
      "isDeleted": false,
      "email": "",
      "username": "",
      "password": "",
      "contact": ""
    });

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [birthplace, setBirthPlace] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');

    const firstNameHandler = (event) => {
      setFirstName(event.target.value);
    };
  
    const lastNameHandler = (event) => {
      setLastName(event.target.value);
    };
    
    const addressHandler = (event) => {
        setAddress(event.target.value);
    };

    const birthDateHandler = (event) => {
        setBirthDate(event.target.value);
    };
    
    const birthPlaceHandler = (event) => {
        setBirthPlace(event.target.value);
    };
    const emailHandler = (event) => {
        setEmail(event.target.value);
    };
    
    const userNameHandler = (event) => {
        setUserName(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };
    
    const contactHandler = (event) => {
        setContact(event.target.value);
    };
  
  
    const submitHandler = (event) => {
      event.preventDefault();

        let date_create = moment().format("YYYY-MM-DD")
        //reset the values of input fields
        /*
        let form_data = new FormData();
        form_data.append("id",'');
        form_data.append("firstname", firstname);
        form_data.append("lastname", lastname);
        form_data.append("dateregistered", dateregistered);
        form_data.append("address", address);
        form_data.append("birthdate", birthdate);
        form_data.append("birthplace", birthplace);
        form_data.append("isDeleted", false);
        form_data.append("email", email);
        form_data.append("username", username);
        form_data.append("password", password);
        form_data.append("contact", contact);
        for (var key in form_data) {
            console.log(key, form_data[key]);
        }
    
    const myNewModel = axios.post("http://127.0.0.1:8000/customer/v1/customers", form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                return res;
            }).catch((error) => {
                return error.response;
            });

    */
    /*
    const response = axios.post('http://127.0.0.1:8000/customer/v1/customers',
    JSON.stringify({
        
        id:'',
        firstname:firstname,
        lastname:lastname,
        dateregistered:date_create,
        address:address,
        birthdate:birthdate,
        birthplace:birthplace,
        isDeleted:false,
        email:email,
        username:username,
        password:password,
        contact:contact
    }).then(function(results){
        console.log(results)
    })
    );
        console.log(response)
        console.log(firstname)
        console.log(lastname)
        console.log(date_create)
        console.log(address)
        console.log(birthdate)
        console.log(birthplace)
        console.log(email)
        console.log(username)
        console.log(password)
        console.log(contact)
    */




        setFirstName('');
        setLastName('');
        setAddress('');
        setBirthDate('');
        setBirthPlace('');
        setContact('');
        setEmail('');
        setPassword('');
        setUserName('');

        const customer = {
            id:'',
            firstname:firstname,
            lastname:lastname,
            dateregistered:date_create,
            address:address,
            birthdate:birthdate,
            birthplace:birthplace,
            isDeleted:false,
            email:email,
            username:username,
            password:password,
            contact:contact
          }

        const options = {
            headers: {"content-type": "application/json"}
        }

       
          axios.post('http://127.0.0.1:8000/customer/v1/customers', customer,options)
            .then(res => {
              console.log(res);
              console.log(res.data);
            })
            
  
      return alert('Entered Values are: '+firstname+','+lastname +','+birthdate)
    };
    return (
        <div>
            <button class="btn btn-primary"  onClick= {handleShow} >Add Customer</button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <Alert variant='primary'>
                <Container>
                <Form onSubmit={submitHandler}>
                <Form.Group  controlId="form.firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstname} onChange={firstNameHandler}placeholder="FirstName" required/>
                    </Form.Group>
                    <Form.Group controlId="form.lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastname} onChange={lastNameHandler} placeholder="LastName" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" value={address} onChange={addressHandler} placeholder="Address" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.birthdate">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type="date" value={birthdate} onChange={birthDateHandler} placeholder="BirthDate" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.birthplace">
                        <Form.Label>Birth Place</Form.Label>
                        <Form.Control type="text" value={birthplace} onChange={birthPlaceHandler} placeholder="BirthPlace" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={emailHandler} placeholder="Email" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" value={username} onChange={userNameHandler} placeholder="UserName" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={passwordHandler} placeholder="PassWord" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="tel" value={contact} onChange={contactHandler} placeholder="Contact" required/>
                    </Form.Group> 
                    <br/>
                    <Button type='submit'>Add Customer</Button>
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
    );
}
export default CustomerAdd;