import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";
import ProductAadd from "./ProductAdd";
import ProductEdit from "./ProductEdit";

function DashboardProduct () {
    const [data, setData] = useState({
        'next': null,
        'previous': null,
        'results':[]
    });

    const [url, setUrl] = useState('http://localhost:8000/dashboard/v1/products');
    const getData = async (url, options=null) => {
        setUrl(url);
        try {
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

    const deleteItem = async(options) => {
        console.log(options)
        console.log(options['id'])
        try {
            const response = await axios.delete('http://127.0.0.1:8000/dashboard/v1/products/' + options['id'], options);
            console.log(response.data);

            window.location.reload(true)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="row">
            <div className="col-3">
                <Aside active={"products"}/>
            </div>
            <div className="col-9">
                <h2>Dashboard Products</h2>
                <table className="table table-bordered table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>ID</th>
                            <th>Datestamp</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Stocks</th>
                            <th>Photos</th>
                            <th>Edit</th>
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
                                   
                                    <button class="btn btn-outline-light btn-sm"><ProductEdit info={d}/></button>
                                    <span> </span>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteItem({"id": d["id"]})}>Delete</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table> 

                <div align="right">
                    { data['previous']!==null && <button className="btn btn-link" onClick={() => getData(data['previous']) }>Previous</button> }
                    { data['next']!==null && <button className="btn btn-link" onClick={() => getData(data['next']) }>Next</button> }
                </div>
                <ProductAadd/>
            </div>
        </div>
    );
}
export default DashboardProduct;