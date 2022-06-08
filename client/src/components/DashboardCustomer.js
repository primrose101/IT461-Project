import React, { useEffect, useState } from "react";
import {helmet} from "react-helmet"
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'

function DashboardCustomer () {

    const [data, setData] = useState([
        {
            'id': 'a', 
            'date': 'b', 
            'firstname': 'c',
            'lastname': 'd',
            'email': 'e',
            'contact': 'e',
            'edit': 'f',
    
        },
        {
            'id': 'a', 
            'date': 'b', 
            'firstname': 'c',
            'lastname': 'd',
            'email': 'e',
            'contact': 'e',
            'edit': 'f',
        }
    ]);

    const [url, setUrl] = useState('/nowhere');
    const getData = async (url, options) => {
        setUrl(url);
        try {
            const response = await fetch(url, options);
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    // useEffect(() => {
    //     const controller = new AbortController();
    //     getData(url, {
    //         signal: controller.signal
    //     });
    //     return () => {
    //         controller.abort();
    //     }
    // }, []);

   // const style1 = {
     //   'margin-left': 'auto',
      //  'margin-right': 'auto'
    //};

    return (
        <div class="container">
            <div class="row">
                <div class="col-2">
                </div>
                <div class="col-10">
                <h2>Dashboard Customer</h2>
                <table class="table table-bordered table-hover">
                    <thead class="bg-info text-white">
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
                    <tbody>
                        { data.map((d) => (
                            <tr>
                                { Object.entries(d).map(([key,value]) =>
                                    <td>{ key!=='edit' ? value : <button class="btn btn-warning">Edit</button> }</td>
                                ) }
                            </tr>
                        )) }
                    </tbody>
                </table> 

                <button class="btn btn-primary">Add Customer</button>
                </div>
            </div>
        </div>
    
    );
}
export default DashboardCustomer;