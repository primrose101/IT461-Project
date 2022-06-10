import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";

function DashboardOrder () {

    const [data, setData] = useState({
        'next': null,
        'previous': null,
        'results':[]
    });

    const [url, setUrl] = useState('http://localhost:8000/dashboard/v1/orders');
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

    return (
        <div className="row">
            <div className="col-3">
                <Aside active={"orders"}/>
            </div>
            <div className="col-9">
                <h2>Dashboard Products</h2>
                <table className="table table-bordered table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        { data['results'].map((d) => (
                            <tr>
                                <td>{ d['id'] }</td>
                                <td>{ d['customer'] }</td>
                                <td>{ d['product'] }</td>
                                <td>{ d['quantity'] }</td>
                            </tr>
                        )) }
                    </tbody>
                </table> 

                <div align="right">
                    { data['previous']!==null && <button className="btn btn-link" onClick={() => getData(data['previous']) }>Previous</button> }
                    { data['next']!==null && <button className="btn btn-link" onClick={() => getData(data['next']) }>Next</button> }
                </div>
            </div>
        </div>
    );
}

export default DashboardOrder;