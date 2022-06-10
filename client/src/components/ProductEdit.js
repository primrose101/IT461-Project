import React, { useState } from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";
import { Form, Button, Container, Alert ,Modal} from 'react-bootstrap';


function ProductEdit(product) {    
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [id] = useState(product['info'].id);
    const [datereg] = useState(product['info'].datereg)
    const [category, setCategory] = useState(product['info'].category);
    const [brand, setBrand] = useState(product['info'].brand);
    const [prodname, setProdName] = useState(product['info'].name);
    const [stock, setStock] = useState(product['info'].stocks);
    const [size, setSize] = useState(product['info'].size);
    const [price, setPrice] = useState(product['info'].price);
    const [photo, setPhoto] = useState(product['info'].image);
    const [color, setColor] = useState(product['info'].color);
    const [desc, setDesc] = useState(product['info'].description);

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

    const submitHandler = () => {

        setBrand('');
        setCategory('');
        setPhoto('');
        setPrice('');
        setProdName('');
        setSize('');
        setStock('');
        setColor('');
        setDesc('');

    let form_data = new FormData();
    form_data.append("id",id);
    form_data.append("image",photo);
    form_data.append("datereg",datereg);
    form_data.append("category", category);
    form_data.append("name", prodname);
    form_data.append("brand", brand);
    form_data.append("size", size);
    form_data.append("price", price);
    form_data.append("stocks", stock);
    form_data.append("isDeleted", false);
    form_data.append("color",color);
    form_data.append("description",desc);

    
    axios.put('http://localhost:8000/dashboard/v1/products', form_data, {
            headers: {
                "Authorization": localStorage.getItem("apple_bees"),
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            console.log(res);
        });

      return alert("Product Information Updated")
    };
    return (
        <div>
            <button className='btn btn-warning btn-sm' display='inline-block'  onClick= {handleShow} >Edit</button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <Alert variant='primary'>
                <Container>
                <Form onSubmit={submitHandler}>
                <Form.Group  controlId="form.category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={category} onChange={categoryHandler}placeholder="Category" />
                    </Form.Group>
                <Form.Group  controlId="form.brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" value={brand} onChange={brandHandler}placeholder="Brand" />
                    </Form.Group>
                    <Form.Group controlId="form.name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={prodname} onChange={nameHandler} placeholder="Name" />
                    </Form.Group>
                    <Form.Group  controlId="form.color">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" value={color} onChange={colorHandler} placeholder="Color" />
                    </Form.Group>
                    <Form.Group  controlId="form.size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="number" value={size} onChange={sizeHandler} placeholder="Size" />
                    </Form.Group>
                    <Form.Group  controlId="form.price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={priceHandler} placeholder="Price" />
                    </Form.Group>
                    <Form.Group  controlId="form.stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" value={stock} onChange={stockHandler} placeholder="Stock" />
                    </Form.Group>
                    <Form.Group  controlId="form.photos">
                        <Form.Label>Photos</Form.Label>
                        <Form.Control type ="file" name="image_url"
                        accept="image/jpeg,image/png,image/gif" onChange={photoHandler} placeholder="Photos" required/>
                    </Form.Group>
                    <Form.Group  controlId="form.desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={desc} onChange={descHandler} placeholder="description"/>
                    </Form.Group>
                  
                    <br/>
                    <Button type='submit'>Update Product</Button>
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
export default ProductEdit;