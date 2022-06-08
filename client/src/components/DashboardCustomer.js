import React, { useEffect, useState } from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import Aside from "./Aside";
import axios from "axios";

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

                <button class="btn btn-primary">Add Customer</button>
            </div>
        </div>
    
    );
}

export default DashboardCustomer;