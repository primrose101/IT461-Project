import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";

function DashboardBuy () {

    const [data, setData] = useState({
        'next': null,
        'previous': null,
        'results':[]
    });

    const [url, setUrl] = useState('http://localhost:8000/dashboard/v1/products');
    const getData = async (url, options) => {
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
                                    <button className="btn btn-warning btn-sm">Buy</button>
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

export default DashboardBuy;