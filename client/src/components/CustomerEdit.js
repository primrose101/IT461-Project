import React, { useState } from 'react';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from 'axios';
import { Form, Button, Container, Alert ,Modal} from 'react-bootstrap';
import moment from 'moment';

function CustomerEdit(param) {
  
    const [data] = useState({
        'id': param['info'].id,
        'firstname': param['info'].firstname,
        'lastname': param['info'].lastname,
        'dateregistered': param['info'].dateregistered,
        'address': param['info'].address,
        'birthdate': param['info'].birthdate,
        'birthplace': param['info'].birthplace,
        'isDeleted': false,
        'email': param['info'].email,
        'username': param['info'].username,
        'password':param['info'].password,
        'contact': param['info'].contact
      });

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [id] = useState(data['id'])
    const [firstname, setFirstName] = useState(data['firstname']);
    const [lastname, setLastName] = useState(data['lastname']);
    const [address, setAddress] = useState(data['address']);
    const [birthdate, setBirthDate] = useState(data['birthdate']);
    const [birthplace, setBirthPlace] = useState(data['birthplace']);
    const [email, setEmail] = useState(data['email']);
    const [username, setUserName] = useState(data['username']);
    const [password, setPassword] = useState(data['password']);
    const [contact, setContact] = useState(data['contact']);
    
      
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

      const submitHandler = () => {
        
  
        let date_create = moment().format('YYYY-MM-DD')
 
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
            id:id,
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
            "Authorization": localStorage.getItem("apple_bees"),
             headers: {'content-type': 'application/json'}
          }
          
         
        axios.put('http://127.0.0.1:8000/customer/v1/customers' , customer,options)
            .then(res => {
              console.log(res);
              console.log(res.data);
            })
            
            
        return alert('Information Updated')
    };
    return (
        <div>
            <button className='btn btn-warning btn-sm'  onClick= {handleShow}>Edit</button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <Alert variant='primary'>
                <Container>
                <Form onSubmit={submitHandler}>
                <Form.Group  controlId='form.firstname'>
                        
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' value={firstname} onChange={firstNameHandler}placeholder='FirstName'/>
                    </Form.Group>
                    <Form.Group controlId='form.lastname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' value={lastname} onChange={lastNameHandler} placeholder='LastName'/>
                    </Form.Group>
                    <Form.Group  controlId='form.address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' value={address} onChange={addressHandler} placeholder='Address'/>
                    </Form.Group>
                    <Form.Group  controlId='form.birthdate'>
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type='date' value={birthdate} onChange={birthDateHandler} placeholder='BirthDate'/>
                    </Form.Group>
                    <Form.Group  controlId='form.birthplace'>
                        <Form.Label>Birth Place</Form.Label>
                        <Form.Control type='text' value={birthplace} onChange={birthPlaceHandler} placeholder='BirthPlace'/>
                    </Form.Group>
                    <Form.Group  controlId='form.email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' value={email} onChange={emailHandler} placeholder='Email' />
                    </Form.Group>
                    <Form.Group  controlId='form.username'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type='text' value={username} onChange={userNameHandler} placeholder='UserName' />
                    </Form.Group>
                    <Form.Group  controlId='form.password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' value={password} onChange={passwordHandler} placeholder='PassWord' />
                    </Form.Group>
                    <Form.Group  controlId='form.contact'>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type='tel' value={contact} onChange={contactHandler} placeholder='Contact' />
                    </Form.Group> 
                    <br/>
                    <Button className='btn btn-warning btn-sm' type="submit" >Update</Button>
                </Form>
                </Container>
                </Alert>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
                    </Modal>
                    </div>
    );
}
export default CustomerEdit;