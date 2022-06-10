import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";
import { Form, Button, Container, Alert ,Modal} from 'react-bootstrap';

function DashboardBuy () {

    //needed logged inn user
    const userid = 1;

    const [showModal, setShow] = useState(false);
    const [prodBuyName, setProdBuyName] = useState('');
    const [quantity, setCount] = useState(1);
    const [buyObject, setBuyObject] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState({
        'next': null,
        'previous': null,
        'results':[]
    });

    const [url, setUrl] = useState('http://localhost:8000/dashboard/v1/products');
    const getData = async (url, options={headers:{'Authorization': localStorage.getItem("apple_bees")}}) => {
        setUrl(url);
        try {
            const response = await axios.get(url, options);
            console.log(response.data)
            setData(response.data);
        } catch (err) {
            if (err.response.status===401) alert("Unauthorized. Please login.");
            console.error(err);
        }
    }


    useEffect(() => {
        const controller = new AbortController();
        getData(url, {
            signal: controller.signal,
            headers: {
                'Authorization': localStorage.getItem("apple_bees")
            }
        });
        return () => {
            controller.abort();
        }
    }, []);
    
    const buyData = (data) =>{
        setBuyObject(data)
        setProdBuyName(data['name'])
        handleShow()
        console.log(data['id'])
    }

    const addCount = ()=>{
        if(quantity+1 <= buyObject['stocks']){
            setCount(quantity+1)        
        }
        else{
            return alert("Number of stocks available is { "+buyObject['stocks']+" }")
        }
    }
    
    const minusCount=()=>{
        
        if(quantity-1 > 0){
            setCount(quantity-1) 
        }
       
    }
    const options = {
        headers: {"content-type": "application/json"}
    }
    const product = {
        quantity:quantity,
        product:"",
        customer: userid,
        
      }
    const buy = ()=>{
        product['product'] = buyObject['id']
          axios.post('http://127.0.0.1:8000/dashboard/v1/orders', product,options)
            .then(res => {
              console.log(res);
              console.log(res.data);
            })
            setCount(1)
            setBuyObject(null)
            handleClose()
    }
    return (
        <div className="row">
            <div className="col-3">
                <Aside active={"buy"}/>
            </div>
            <div className="col-9">
                <h2>Dashboard Products</h2>
                <table className="table table-bordered table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Photos</th>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        { data['results'].map((d) => (
                            <tr>
                                <td>
                                    <img src={ d['image'] } alt={ d['id'] } width="auto" height="80px" />
                                </td>
                                <td>{ d['name'] } ({ d['brand'] })</td>
                                <td>{ d['description'] }, { d['size'] }, { d['color'] } </td>
                                <td>Php { parseFloat(d['price']).toFixed(2) }</td>
                                <td>
                                    <button className="btn btn-outline-success btn-sm" onClick={()=>buyData(d)}> Buy</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table> 
                <div>
                                <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{prodBuyName}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body> <Alert variant='primary'>
                                        <h3>QUANTITY:</h3>
                                    <br/>
                                <div>
                                    <Button variant="info"  onClick  =  {minusCount}>-</Button>[   {quantity}  ]<Button variant="info" onClick = {addCount}>+</Button>
                                 </div>
                                <br/>
                                <Button variant="primary" onClick={()=>buy()}>Buy</Button>
                                        </Alert>
                                </Modal.Body>
                                <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                        Close
                                        </Button>
                                </Modal.Footer>
                                    </Modal>
                                </div>

                <div align="right">
                    { data['previous']!==null && <button className="btn btn-link" onClick={() => getData(data['previous']) }>Previous</button> }
                    { data['next']!==null && <button className="btn btn-link" onClick={() => getData(data['next']) }>Next</button> }
                </div>
            </div>
        </div>
    );
}

export default DashboardBuy;