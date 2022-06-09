import React, { useEffect, useState } from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";
import { Form, Button, Container, Alert ,Modal} from 'react-bootstrap';
import moment from "moment";

function ProductAdd() {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [prodname, setProdName] = useState('');
    const [stock, setStock] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState(null);
    const [color, setColor] = useState('');
    const [desc, setDesc] = useState('');

    const categoryHandler = (event) => {
      setCategory(event.target.value);
    };
  
    const brandHandler = (event) => {
      setBrand(event.target.value);
    };
    
    const nameHandler = (event) => {
        setProdName(event.target.value);
    };

    const stockHandler = (event) => {
        setStock(event.target.value);
    };
    
    const priceHandler = (event) => {
        setPrice(event.target.value);
    };
    const sizeHandler = (event) => {
        setSize(event.target.value);
    };
    
    const photoHandler = (event) => {
        setPhoto(event.target.files[0]);
    };
    const colorHandler = (event) => {
        setColor(event.target.value);
    };
    const descHandler = (event) => {
        setDesc(event.target.value);
    };


  
  
    const submitHandler = (event) => {
      event.preventDefault();

        let date_create = moment().format("YYYY-MM-DD")
        //reset the values of input fields

        setBrand('');
        setCategory('');
        setPhoto('');
        setPrice('');
        setProdName('');
        setSize('');
        setStock('');
        setColor('');

    let form_data = new FormData();
    form_data.append("id","");
    form_data.append("image",photo);
    form_data.append("datereg",date_create );
    form_data.append("category", category);
    form_data.append("name", prodname);
    form_data.append("brand", brand);
    form_data.append("size", size);
    form_data.append("price", price);
    form_data.append("stocks", stock);
    form_data.append("isDeleted", false);
    form_data.append("color",color);
    form_data.append("description",desc);

    
axios.post('http://localhost:8000/dashboard/v1/products', form_data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            console.log(res);
        });

      

      
      return alert("Successs!")
    };
    return (
        <div>
            <button class="btn btn-primary"  onClick= {handleShow} >Add Product</button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <Alert variant='primary'>
                <Container>
                <Form onSubmit={submitHandler}>
                <Form.Group  controlId="form.category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={category} onChange={categoryHandler}placeholder="Category" required/>
                    </Form.Group>
                <Form.Group  controlId="form.brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" value={brand} onChange={brandHandler}placeholder="Brand" required/>
                    </Form.Group>
                    <Form.Group controlId="form.name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={prodname} onChange={nameHandler} placeholder="Name" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.color">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" value={color} onChange={colorHandler} placeholder="Color" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="number" value={size} onChange={sizeHandler} placeholder="Size" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={priceHandler} placeholder="Price" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" value={stock} onChange={stockHandler} placeholder="Stock" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.photos">
                        <Form.Label>Photos</Form.Label>
                        <Form.Control type ="file" name="image_url"
                        accept="image/jpeg,image/png,image/gif"  onChange={photoHandler} placeholder="Photos"/>
                    </Form.Group>
                    <Form.Group  controlId="form.desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={desc} onChange={descHandler} placeholder="description"/>
                    </Form.Group>
                  
                    <br/>
                    <Button type='submit'>Add Product</Button>
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
export default ProductAdd;