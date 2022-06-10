import React, { useEffect, useState } from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import Aside from "./Aside";
import axios from "axios";
import CustomerAdd from "./CustomerAdd";
import CustomerEdit from "./CustomerEdit";

function DashboardCustomer () {

    

    const [data, setData] = useState({
        'next': null,
        'previous': null,
        'results':[]
    });

    const [url, setUrl] = useState('http://localhost:8000/customer/v1/customers');
    const getData = async (url, options={headers:{'Authorization': localStorage.getItem("apple_bees")}}) => {
        setUrl(url);
        try {
            const response = await axios.get(url, options);
            console.log(response.data);
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

    const deleteItem = async(options) => {
        console.log(options)
        console.log(options['id'])
        try {
            options.headers = {'Authorization': localStorage.getItem("apple_bees")}
            const response = await axios.delete('http://127.0.0.1:8000/customer/v1/customers/' + options['id'], options);
            console.log(response.data);

            window.location.reload(true)
        } catch (err) {
            console.error(err);
        }
    }

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
                                    <button class="btn btn-outline-light btn-sm"><CustomerEdit info={d}/></button>
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
                <CustomerAdd/>
            </div>
        </div>
    
    );
}

export default DashboardCustomer;