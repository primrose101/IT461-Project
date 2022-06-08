import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";

function DashboardProduct () {

    const [data, setData] = useState({
        'next': null,
        'previous': null,
        'results':[]
    });

    const [url, setUrl] = useState('http://localhost:8000/dashboard/v1/products');
    const getData = async (url, options) => {
        setUrl(url);
        try {
            console.log("was here");
            const response = await axios.get(url, options);
            console.log(response.data)
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

    return (
        <div className="row">
            <div className="col-3">
                <Aside/>
            </div>
            <div col-9>
                <h2>Dashboard Products</h2>
                <table className="table table-bordered table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>ID no.</th>
                            <th>Datestamp</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Stocks</th>
                            <th>Photos</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        { data['results'].map((d) => (
                            <tr>
                                <td>{ d['id'] }</td>
                                <td>{ d['datereg'] }</td>
                                <td>{ d['category'] }</td>
                                <td>{ d['brand'] }</td>
                                <td>{ d['name'] }</td>
                                <td>{ d['size'] }</td>
                                <td>{ d['price'] }</td>
                                <td>{ d['stocks'] }</td>
                                <td>
                                    <img src={ d['image'] } alt={ d['id'] } width="auto" height="80px" />
                                </td>
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
                <button className="btn btn-primary">Add Product</button>
            </div>
        </div>
    );
}

export default DashboardProduct;